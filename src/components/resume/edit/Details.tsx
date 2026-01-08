"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResume } from "@/store/store";

import { SectionTitle } from "./ui/SectionTitle";

export const Details: React.FC = () => {
  const jobTitle = useResume((state) => state.jobTitle);
  const firstName = useResume((state) => state.firstName);
  const lastName = useResume((state) => state.lastName);
  const email = useResume((state) => state.email);
  const phone = useResume((state) => state.phone);
  const country = useResume((state) => state.country);
  const city = useResume((state) => state.city);

  const setField = useResume((state) => state.setField);

  return (
    <div className="mb-8">
      <SectionTitle>Details</SectionTitle>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <Label htmlFor="jobTitle" className="mb-2">
            Wanted Job Title
          </Label>
          <Input
            id="jobTitle"
            type="text"
            placeholder="Wanted Job Title"
            className="w-full"
            value={jobTitle}
            onChange={(e) => setField("jobTitle", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="photo" className="mb-2">
            Photo
          </Label>
          <Button asChild variant="outline" className="flex items-center pt-1">
            <input
              id="photo"
              type="file"
              accept=".jpg, .jpeg, .png"
              className="w-full"
            />
          </Button>
        </div>

        <div>
          <Label htmlFor="firstName" className="mb-2">
            First Name
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="First Name"
            className="w-full"
            value={firstName}
            onChange={(e) => setField("firstName", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="lastName" className="mb-2">
            Last Name
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Last Name"
            className="w-full"
            value={lastName}
            onChange={(e) => setField("lastName", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="email" className="mb-2">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full"
            value={email}
            onChange={(e) => setField("email", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="phone" className="mb-2">
            Phone
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Phone"
            className="w-full"
            value={phone}
            onChange={(e) => setField("phone", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="country" className="mb-2">
            Country
          </Label>
          <Input
            id="country"
            type="text"
            placeholder="Country"
            className="w-full"
            value={country}
            onChange={(e) => setField("country", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="city" className="mb-2">
            City
          </Label>
          <Input
            id="city"
            type="text"
            placeholder="City"
            className="w-full"
            value={city}
            onChange={(e) => setField("city", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
