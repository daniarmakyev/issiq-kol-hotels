
"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Select,
  Option,
  Textarea,
  Stack,
  Typography,
  Divider,
  Chip,
  IconButton,
  Box
} from "@mui/joy";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { HouseFormProps, House, LocalizedText, LocalizedStringArray } from "@/helpers/types";

type OptionType = {
  value: string;
  label: string;
};

const HouseForm: React.FC<HouseFormProps> = ({ onSubmit, onClose }) => {
    const [id, setId] = useState<string>()
    useEffect(() => {
        const id = localStorage.getItem("id")
        setId(id+'')
    },[])

  const [house, setHouse] = useState<House>({
    name: { en: "", ru: "", kg: "", kz: "" },
    location: { en: "", ru: "", kg: "", kz: "" },
    geo: { latitude: 0, longitude: 0 },
    price: 0,
    currency: "KGS",
    limit: 1,
    beds: 1,
    rooms: 1,
    bathrooms: 1,
    square: 0,
    category: "guesthouse",
    type: "house",
    amenities: { en: [], ru: [], kg: [], kz: [] },
    services: { en: [], ru: [], kg: [], kz: [] },
    description: { en: "", ru: "", kg: "", kz: "" },
    contact: { phone: "", email: "" },
    images: [],
    availability: {
      check_in: "13:00",
      check_out: "12:00",
      total_count: 1,
      available_count: 1,
    },
    policies: {
      pets_allowed: false,
      cancellation: { en: "", ru: "", kg: "", kz: "" },
    },
    owner: "0",
    services_count: 0,
    amenities_count: 0,
    rating: 0,
  });

  type LanguageKey = keyof LocalizedText;
  
  const [currentLanguage, setCurrentLanguage] = useState<LanguageKey>("en");
  const [newAmenity, setNewAmenity] = useState<string>("");
  const [newService, setNewService] = useState<string>("");
  const [newImage, setNewImage] = useState<string>("");

  const generateTimeOptions = (): string[] => {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return times;
  };

  const timeOptions: string[] = generateTimeOptions();

  const categoryOptions: OptionType[] = [
    { value: "apartment", label: "Apartment" },
    { value: "house", label: "House" },
    { value: "guesthouse", label: "Guest House" },
    { value: "villa", label: "Villa" },
    { value: "hotel", label: "Hotel" }
  ];

  const typeOptions: OptionType[] = [
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
    { value: "room", label: "Room" }
  ];

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    
    const allLanguagesFilled = ["en", "ru", "kg", "kz"].every((lang) => {
      const language = lang as LanguageKey;
      return (
        house.name[language].trim() !== "" &&
        house.location[language].trim() !== "" &&
        house.description[language].trim() !== "" &&
        house.policies.cancellation[language].trim() !== ""
      );
    });
    
    const currentServicesCount = house.services[currentLanguage].length;
    const currentAmenitiesCount = house.amenities[currentLanguage].length;

    const hasAmenities = Object.values(house.amenities).some(arr => arr.length > 0);
    const hasServices = Object.values(house.services).some(arr => arr.length > 0);
    const hasImages = house.images.length > 0;
    
    if (!allLanguagesFilled || !hasAmenities || !hasServices || !hasImages) {
      alert("Please fill in all required fields for all languages and add at least one amenity, service, and image.");
      return;
    }

    const updatedHouse = {
        ...house,
        owner: id || "0",
        rating: 0, 
        services_count: currentServicesCount,
        amenities_count: currentAmenitiesCount,
      };
    
    onSubmit(updatedHouse);
  };

  const handleChange = <K extends keyof House>(field: K, value: House[K]): void => {
    setHouse({ ...house, [field]: value });
  };

  const handleLocalizedChange = (
    field: keyof Pick<House, "name" | "location" | "description">,
    language: LanguageKey,
    value: string
  ): void => {
    setHouse({
      ...house,
      [field]: { ...house[field], [language]: value } as LocalizedText,
    });
  };

  const handleGeoChange = (field: keyof House["geo"], value: string): void => {
    setHouse({
      ...house,
      geo: { ...house.geo, [field]: parseFloat(value) || 0 },
    });
  };

  const handleContactChange = (field: keyof House["contact"], value: string): void => {
    setHouse({
      ...house,
      contact: { ...house.contact, [field]: value },
    });
  };

  const handleAvailabilityChange = (field: keyof House["availability"], value: number | string): void => {
    setHouse({
      ...house,
      availability: { ...house.availability, [field]: value },
    });
  };

  const handlePoliciesChange = (field: keyof House["policies"], value: boolean | LocalizedText): void => {
    setHouse({
      ...house,
      policies: { ...house.policies, [field]: value },
    });
  };

  const handleCancellationChange = (language: LanguageKey, value: string): void => {
    setHouse({
      ...house,
      policies: {
        ...house.policies,
        cancellation: { ...house.policies.cancellation, [language]: value },
      },
    });
  };

  const addAmenity = (): void => {
    if (!newAmenity.trim()) return;
    
    const updatedAmenities = { ...house.amenities } as LocalizedStringArray;
    updatedAmenities[currentLanguage] = [
      ...updatedAmenities[currentLanguage],
      newAmenity.trim(),
    ];
    
    setHouse({ ...house, amenities: updatedAmenities });
    setNewAmenity("");
  };

  const removeAmenity = (index: number): void => {
    const updatedAmenities = { ...house.amenities } as LocalizedStringArray;
    updatedAmenities[currentLanguage] = updatedAmenities[currentLanguage].filter(
      (_, i) => i !== index
    );
    setHouse({ ...house, amenities: updatedAmenities });
  };

  const addService = (): void => {
    if (!newService.trim()) return;
    
    const updatedServices = { ...house.services } as LocalizedStringArray;
    updatedServices[currentLanguage] = [
      ...updatedServices[currentLanguage],
      newService.trim(),
    ];
    
    setHouse({ ...house, services: updatedServices });
    setNewService("");
  };

  const removeService = (index: number): void => {
    const updatedServices = { ...house.services } as LocalizedStringArray;
    updatedServices[currentLanguage] = updatedServices[currentLanguage].filter(
      (_, i) => i !== index
    );
    setHouse({ ...house, services: updatedServices });
  };

  const addImage = (): void => {
    if (!newImage.trim()) return;
    setHouse({ ...house, images: [...house.images, newImage.trim()] });
    setNewImage("");
  };

  const removeImage = (index: number): void => {
    setHouse({
      ...house,
      images: house.images.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ mb: 3, maxHeight: '70vh', overflowY: 'auto', p: 1 }}>
        <FormControl>
          <FormLabel>Language</FormLabel>
          <Select
            value={currentLanguage}
            onChange={(_, value) => value && setCurrentLanguage(value as LanguageKey)}
          >
            <Option value="en">English</Option>
            <Option value="ru">Russian</Option>
            <Option value="kg">Kyrgyz</Option>
            <Option value="kz">Kazakh</Option>
          </Select>
        </FormControl>

        <Typography level="h4">Basic Information</Typography>

        <FormControl required>
          <FormLabel>Name *</FormLabel>
          <Input
            value={house.name[currentLanguage]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleLocalizedChange("name", currentLanguage, e.target.value)
            }
            required
          />
        </FormControl>

        <FormControl required>
          <FormLabel>Location *</FormLabel>
          <Input
            value={house.location[currentLanguage]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleLocalizedChange("location", currentLanguage, e.target.value)
            }
            required
          />
        </FormControl>

        <Stack direction="row" spacing={2}>
          <FormControl sx={{ width: "50%" }} required>
            <FormLabel>Latitude *</FormLabel>
            <Input
              type="number"
              value={house.geo.latitude}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleGeoChange("latitude", e.target.value)}
              slotProps={{
                input: { step: "0.000001" }
              }}
              required
            />
          </FormControl>

          <FormControl sx={{ width: "50%" }} required>
            <FormLabel>Longitude *</FormLabel>
            <Input
              type="number"
              value={house.geo.longitude}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleGeoChange("longitude", e.target.value)}
              slotProps={{
                input: { step: "0.000001" }
              }}
              required
            />
          </FormControl>
        </Stack>

        <Divider />
        <Typography level="h4">Property Details</Typography>

        <Stack direction="row" spacing={2}>
          <FormControl sx={{ width: "50%" }} required>
            <FormLabel>Category *</FormLabel>
            <Select
              value={house.category}
              onChange={(_, value) => value && handleChange("category", value)}
              required
            >
              {categoryOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: "50%" }} required>
            <FormLabel>Type *</FormLabel>
            <Select
              value={house.type}
              onChange={(_, value) => value && handleChange("type", value)}
              required
            >
              {typeOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={2}>
          <FormControl sx={{ width: "50%" }} required>
            <FormLabel>Price *</FormLabel>
            <Input
              type="number"
              value={house.price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("price", parseInt(e.target.value) || 0)}
              required
            />
          </FormControl>

          <FormControl sx={{ width: "50%" }} required>
            <FormLabel>Currency *</FormLabel>
            <Select
              value={house.currency}
              onChange={(_, value) => value && handleChange("currency", value)}
              required
            >
              <Option value="KGS">KGS</Option>
              <Option value="USD">USD</Option>
              <Option value="KZT">KZT</Option>
              <Option value="RUB">RUB</Option>
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={2}>
          <FormControl sx={{ width: "50%" }} required>
            <FormLabel>Guest Limit *</FormLabel>
            <Input
              type="number"
              value={house.limit}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("limit", parseInt(e.target.value) || 1)}
              slotProps={{
                input: { min: "1" }
              }}
              required
            />
          </FormControl>

          <FormControl sx={{ width: "50%" }} required>
            <FormLabel>Square meters *</FormLabel>
            <Input
              type="number"
              value={house.square}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("square", parseInt(e.target.value) || 0)}
              slotProps={{
                input: { min: "1" }
              }}
              required
            />
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={2}>
          <FormControl sx={{ width: "33%" }} required>
            <FormLabel>Beds *</FormLabel>
            <Input
              type="number"
              value={house.beds}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("beds", parseInt(e.target.value) || 1)}
              slotProps={{
                input: { min: "1" }
              }}
              required
            />
          </FormControl>

          <FormControl sx={{ width: "33%" }} required>
            <FormLabel>Rooms *</FormLabel>
            <Input
              type="number"
              value={house.rooms}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("rooms", parseInt(e.target.value) || 1)}
              slotProps={{
                input: { min: "1" }
              }}
              required
            />
          </FormControl>

          <FormControl sx={{ width: "33%" }} required>
            <FormLabel>Bathrooms *</FormLabel>
            <Input
              type="number"
              value={house.bathrooms}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("bathrooms", parseInt(e.target.value) || 1)}
              slotProps={{
                input: { min: "1" }
              }}
              required
            />
          </FormControl>
        </Stack>

        <Divider />
        <Typography level="h4">Availability</Typography>

        <Stack direction="row" spacing={2}>
          <FormControl sx={{ width: "50%" }} required>
            <FormLabel>Check-in Time *</FormLabel>
            <Select
              value={house.availability.check_in}
              onChange={(_, value) => value && handleAvailabilityChange("check_in", value)}
              required
            >
              {timeOptions.map((time) => (
                <Option key={`checkin-${time}`} value={time}>
                  {time}
                </Option>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: "50%" }} required>
            <FormLabel>Check-out Time *</FormLabel>
            <Select
              value={house.availability.check_out}
              onChange={(_, value) => value && handleAvailabilityChange("check_out", value)}
              required
            >
              {timeOptions.map((time) => (
                <Option key={`checkout-${time}`} value={time}>
                  {time}
                </Option>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={2}>
          <FormControl sx={{ width: "50%" }} required>
            <FormLabel>Total Count *</FormLabel>
            <Input
              type="number"
              value={house.availability.total_count}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                handleAvailabilityChange("total_count", parseInt(e.target.value) || 1)
              }
              slotProps={{
                input: { min: "1" }
              }}
              required
            />
          </FormControl>

          <FormControl sx={{ width: "50%" }} required>
            <FormLabel>Available Count *</FormLabel>
            <Input
              type="number"
              value={house.availability.available_count}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                handleAvailabilityChange("available_count", parseInt(e.target.value) || 0)
              }
              slotProps={{
                input: { 
                  min: "0",
                  max: house.availability.total_count.toString()
                }
              }}
              required
            />
          </FormControl>
        </Stack>

        <Divider />
        <Typography level="h4">Description</Typography>

        <FormControl required>
          <FormLabel>Description *</FormLabel>
          <Textarea
            minRows={3}
            value={house.description[currentLanguage]}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleLocalizedChange("description", currentLanguage, e.target.value)
            }
            required
          />
        </FormControl>

        <Divider />
        <Typography level="h4">Amenities</Typography>
        
        <Typography color="warning" level="body-sm">
          * At least one amenity is required for each language
        </Typography>
        
        <Stack direction="row" spacing={2} sx={{ alignItems: "flex-end" }}>
          <FormControl sx={{ width: "70%" }}>
            <FormLabel>Add Amenity *</FormLabel>
            <Input
              value={newAmenity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewAmenity(e.target.value)}
              placeholder="WiFi, Pool, etc."
            />
          </FormControl>
          <Button
            startDecorator={<AddIcon />}
            onClick={addAmenity}
            sx={{ width: "30%" }}
          >
            Add
          </Button>
        </Stack>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {house.amenities[currentLanguage]?.map((amenity, index) => (
            <Chip
              key={index}
              variant="soft"
              color="primary"
              endDecorator={
                <IconButton
                  variant="plain"
                  size="sm"
                  color="neutral"
                  onClick={() => removeAmenity(index)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              }
            >
              {amenity}
            </Chip>
          ))}
        </Box>

        <Divider />
        <Typography level="h4">Services</Typography>
        
        <Typography color="warning" level="body-sm">
          * At least one service is required for each language
        </Typography>

        <Stack direction="row" spacing={2} sx={{ alignItems: "flex-end" }}>
          <FormControl sx={{ width: "70%" }}>
            <FormLabel>Add Service *</FormLabel>
            <Input
              value={newService}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewService(e.target.value)}
              placeholder="Cleaning, Breakfast, etc."
            />
          </FormControl>
          <Button
            startDecorator={<AddIcon />}
            onClick={addService}
            sx={{ width: "30%" }}
          >
            Add
          </Button>
        </Stack>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {house.services[currentLanguage]?.map((service, index) => (
            <Chip
              key={index}
              variant="soft"
              color="success"
              endDecorator={
                <IconButton
                  variant="plain"
                  size="sm"
                  color="neutral"
                  onClick={() => removeService(index)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              }
            >
              {service}
            </Chip>
          ))}
        </Box>

        <Divider />
        <Typography level="h4">Images</Typography>
        
        <Typography color="warning" level="body-sm">
          * At least one image is required
        </Typography>

        <Stack direction="row" spacing={2} sx={{ alignItems: "flex-end" }}>
          <FormControl sx={{ width: "70%" }}>
            <FormLabel>Add Image URL *</FormLabel>
            <Input
              value={newImage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </FormControl>
          <Button
            startDecorator={<AddIcon />}
            onClick={addImage}
            sx={{ width: "30%" }}
          >
            Add
          </Button>
        </Stack>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {house.images.map((image, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              sx={{ alignItems: "center" }}
            >
              <Typography
                sx={{
                  width: "80%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}
              >
                {image}
              </Typography>
              <IconButton
                variant="plain"
                color="danger"
                onClick={() => removeImage(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}
        </Box>

        <Divider />
        <Typography level="h4">Contact Information</Typography>

        <FormControl required>
          <FormLabel>Phone *</FormLabel>
          <Input
            value={house.contact.phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleContactChange("phone", e.target.value)}
            placeholder="+996 XXX XXX XXX"
            required
          />
        </FormControl>

        <FormControl required>
          <FormLabel>Email *</FormLabel>
          <Input
            type="email"
            value={house.contact.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleContactChange("email", e.target.value)}
            required
          />
        </FormControl>

        <Divider />
        <Typography level="h4">Policies</Typography>

        <FormControl required>
          <FormLabel>Pets Allowed</FormLabel>
          <Checkbox
            checked={house.policies.pets_allowed}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              handlePoliciesChange("pets_allowed", e.target.checked)
            }
          />
        </FormControl>

        <FormControl required>
          <FormLabel>Cancellation Policy *</FormLabel>
          <Textarea
            minRows={2}
            value={house.policies.cancellation[currentLanguage]}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleCancellationChange(currentLanguage, e.target.value)
            }
            placeholder="Describe cancellation policy"
            required
          />
        </FormControl>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end", mt: 2 }}>
        <Button variant="outlined" color="neutral" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Create House
        </Button>
      </Stack>
    </form>
  );
};

export default HouseForm;