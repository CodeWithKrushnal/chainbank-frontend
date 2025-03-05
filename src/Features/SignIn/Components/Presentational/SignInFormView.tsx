import React from 'react';
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Zap} from "lucide-react";


interface SignInFormViewProps {
  formData: {
    email: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const SignInFormView: React.FC<SignInFormViewProps> = ({
  formData,
    handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label className="text-gray-600">Email:</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label>Password:</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 py-4">
        <div className="items-center text-center justify-center gap-2">
          <Button type="submit" className="w-full">
            <Zap strokeWidth="1.5" size="16px" />
            Sign In
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignInFormView;
