// src/components/KYCFormView.tsx
import React from 'react';
import {KYCRequest} from "@/Features/Profile/Types/KYC.ts";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {BadgeCheck} from "lucide-react";

interface KYCFormViewProps {
  formData: KYCRequest;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const KYCFormView: React.FC<KYCFormViewProps> = ({ formData, handleChange, handleSubmit }) => {
  return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="text-gray-700">Document Type:</Label>
          <Input
            type="text"
            name="document_type"
            value={formData.document_type}
            onChange={handleChange}
            required
            className="border p-4 my-2 w-full"
          />
        </div>
        <div>
          <Label className="text-gray-700">Document Number:</Label>
          <Input
            type="text"
            name="document_number"
            value={formData.document_number}
            onChange={handleChange}
            required
            className="border p-4 my-2 w-full"
          />
        </div>
        <Button type="submit" className="rounded-xl">
          <BadgeCheck size={"16px"}/>
          Apply for KYC
        </Button>
      </form>
  );
};

export default KYCFormView;
