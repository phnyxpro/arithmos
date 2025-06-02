 "use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Using next/navigation for useRouter
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

// Comprehensive Industry Options
const industryOptions = [
  { value: 'accounting', label: 'Accounting' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'architecture', label: 'Architecture' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'banking', label: 'Banking' },
  { value: 'biotechnology', label: 'Biotechnology' },
  { value: 'construction', label: 'Construction' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'education', label: 'Education' },
  { value: 'energy', label: 'Energy' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'environmental', label: 'Environmental' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'finance', label: 'Finance' },
  { value: 'food_beverage', label: 'Food & Beverage' },
  { value: 'government', label: 'Government' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'human_resources', label: 'Human Resources' },
  { value: 'information_technology', label: 'Information Technology' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'journalism_media', label: 'Journalism & Media' },
  { value: 'legal', label: 'Legal' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'non_profit', label: 'Non-Profit' },
  { value: 'pharmaceutical', label: 'Pharmaceutical' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'retail', label: 'Retail' },
  { value: 'telecommunications', label: 'Telecommunications' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'travel', label: 'Travel' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'other', label: 'Other' },
];

// Placeholder Billing Plan Options
const billingPlanOptions = [
  { value: 'basic', label: 'Basic' },
  { value: 'pro', label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise' },
];

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for login logic
    console.log("Login attempted with:", { email, password });
    // After successful login and fetching claims:
    const userRole = "manager"; // Replace with actual fetched role
    switch (userRole) {
      case "admin":
        router.push("/admin");
        break;
      case "manager":
        router.push("/dashboard");
        break;
      default:
        router.push("/workspace");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full">
        Log In
      </Button>
      <div className="text-center text-sm">
        <Link href="#" className="underline">
          Forgot password?
        </Link>
      </div>
    </form>
  );
}

function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [billingPlan, setBillingPlan] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("You must agree to the terms and conditions."); // Replace with a more sophisticated UI feedback
      return;
    }

    try {
      // 1. Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Create user document in Firestore
      await setDoc(doc(db, "companies", user.uid), {
        fullName,
        email,
        companyName,
        industry,
        billingPlan,
        // logoFile: logoFile?.name, // Consider storing logo in Firebase Storage and saving the URL here
        createdAt: new Date(),
        role: "manager", // Set the role to "manager"
      });

      // 3. Redirect to dashboard
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Signup failed:", error);
      alert(error.message); // Display error to user. More robust error handling is needed.
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signupEmail">Email</Label>
        <Input
          id="signupEmail"
          type="email"
          placeholder="m@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signupPassword">Password</Label>
        <Input
          id="signupPassword"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
       <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          type="text"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Select value={industry} onValueChange={setIndustry} required>
          <SelectTrigger id="industry">
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            {industryOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
       <div className="space-y-2">
        <Label htmlFor="billingPlan">Billing Plan</Label>
         <Select value={billingPlan} onValueChange={setBillingPlan} required>
          <SelectTrigger id="billingPlan">
            <SelectValue placeholder="Select plan" />
          </SelectTrigger>
          <SelectContent>
            {billingPlanOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
       <div className="space-y-2">
        <Label htmlFor="logo">Company Logo (Optional)</Label>
        <Input
          id="logo"
          type="file"
          accept="image/*"
          onChange={(e) => setLogoFile(e.target.files ? e.target.files[0] : null)}
        />
      </div>
       <div className="flex items-center space-x-2">
        <Checkbox id="terms" checked={agreeTerms} onCheckedChange={(checked) => setAgreeTerms(Boolean(checked))} required />
        <Label htmlFor="terms">I agree to the terms and conditions</Label>
      </div>
      <Button type="submit" className="w-full">
        Create Company Account
      </Button>
    </form>
  );
}

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Welcome to Arithmos Studio 👋</CardTitle>
          <CardDescription>
             Your centralized dashboard for your tools. {isSignup ? "Create a new company as a manager." : "Sign in to access your account."} 
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSignup ? <SignupForm /> : <LoginForm />}
          <div className="mt-4 text-center text-sm">
            <Button variant="link" onClick={() => setIsSignup(!isSignup)} className="px-0">
              {isSignup
                ? "Already have an account? Log in here"
                : "Don’t have a company yet? Sign up as a manager"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
