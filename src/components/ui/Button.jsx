import React from "react";
import { Check, X, AlertCircle, Loader2, ChevronRight } from "lucide-react";

// Base button component with common styles
const BaseButton = ({
  children,
  className = "",
  loading = false,
  disabled = false,
  icon: Icon,
  onClick,
  type = "button",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      type={type}
      className={`${baseStyles} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!loading && Icon && <Icon className="mr-2 h-4 w-4" />}
      {children}
    </button>
  );
};

// Confirm/Success button
export const ConfirmButton = ({ children = "Confirm", ...props }) => (
  <BaseButton
    className="bg-green-600 text-white px-4 py-2 hover:bg-green-700 focus:ring-green-500"
    icon={Check}
    {...props}>
    {children}
  </BaseButton>
);

// Cancel/Danger button
export const CancelButton = ({ children = "Cancel", ...props }) => (
  <BaseButton
    className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 focus:ring-red-500"
    icon={X}
    {...props}>
    {children}
  </BaseButton>
);

// Primary button
export const PrimaryButton = ({ children, ...props }) => (
  <BaseButton
    className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 focus:ring-blue-500"
    {...props}>
    {children}
  </BaseButton>
);

// Secondary button
export const SecondaryButton = ({ children, ...props }) => (
  <BaseButton
    className="bg-gray-200 text-gray-800 px-4 py-2 hover:bg-gray-300 focus:ring-gray-500"
    {...props}>
    {children}
  </BaseButton>
);

// Outline button
export const OutlineButton = ({ children, ...props }) => (
  <BaseButton
    className="border border-gray-300 bg-transparent text-gray-700 px-4 py-2 hover:bg-gray-50 focus:ring-gray-500"
    {...props}>
    {children}
  </BaseButton>
);

// Warning button
export const WarningButton = ({ children, ...props }) => (
  <BaseButton
    className="bg-yellow-500 text-white px-4 py-2 hover:bg-yellow-600 focus:ring-yellow-500"
    icon={AlertCircle}
    {...props}>
    {children}
  </BaseButton>
);

// Link button
export const LinkButton = ({ children, ...props }) => (
  <BaseButton
    className="text-blue-600 hover:text-blue-700 hover:underline px-4 py-2 focus:ring-blue-500"
    {...props}>
    {children}
  </BaseButton>
);

// Small button variant
export const SmallButton = ({ children, className = "", ...props }) => (
  <BaseButton className={`px-3 py-1.5 text-sm ${className}`} {...props}>
    {children}
  </BaseButton>
);

// Large button variant
export const LargeButton = ({ children, className = "", ...props }) => (
  <BaseButton className={`px-6 py-3 text-lg ${className}`} {...props}>
    {children}
  </BaseButton>
);

// Icon button
export const IconButton = ({ icon: Icon, label, className = "", ...props }) => (
  <BaseButton
    className={`p-2 hover:bg-gray-100 rounded-full ${className}`}
    aria-label={label}
    {...props}>
    <Icon className="h-5 w-5" />
  </BaseButton>
);

// Action button with arrow
export const ActionButton = ({ children, ...props }) => (
  <BaseButton
    className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 focus:ring-blue-500 group"
    {...props}>
    <span className="flex items-center">
      {children}
      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </span>
  </BaseButton>
);
