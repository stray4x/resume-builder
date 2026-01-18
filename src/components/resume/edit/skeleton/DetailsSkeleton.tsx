"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { SectionTitle } from "../ui/SectionTitle";

export const DetailsSkeleton: React.FC = () => {
  return (
    <div className="mb-8">
      <SectionTitle>Details</SectionTitle>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <Label className="mb-2">Wanted Job Title</Label>
          <Input placeholder="Wanted Job Title" className="w-full" disabled />
        </div>
        <div>
          <Label className="mb-2">Photo</Label>
          <div className="flex gap-4">
            <Button
              asChild
              variant="outline"
              className="w-full transition-none"
            >
              <span>Upload photo</span>
            </Button>
          </div>
        </div>
        <div>
          <Label className="mb-2">First Name</Label>
          <Input placeholder="First Name" className="w-full" disabled />
        </div>

        <div>
          <Label htmlFor="lastName" className="mb-2">
            Last Name
          </Label>
          <Input placeholder="Last Name" className="w-full" disabled />
        </div>

        <div>
          <Label className="mb-2">Email</Label>
          <Input placeholder="Email" className="w-full" disabled />
        </div>

        <div>
          <Label className="mb-2">Phone</Label>
          <Input placeholder="Phone" className="w-full" disabled />
        </div>

        <div>
          <Label className="mb-2">Country</Label>
          <Input placeholder="Country" className="w-full" disabled />
        </div>

        <div>
          <Label className="mb-2">City</Label>
          <Input placeholder="City" className="w-full" disabled />
        </div>
      </div>
    </div>
  );
};
