// src/components/common/Loading.jsx
import React from "react";
import { Loader2 } from "lucide-react";

// Full page loading spinner
export const FullPageLoader = () => (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="text-center">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
      <p className="mt-2 text-sm text-gray-500">Loading...</p>
    </div>
  </div>
);

// Button loading spinner (to be used inside buttons)
export const ButtonLoader = ({ size = 16, className = "" }) => (
  <Loader2 className={`animate-spin ${className}`} size={size} />
);

// Inline loading spinner
export const InlineLoader = ({ size = "small" }) => {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-6 w-6",
    large: "h-8 w-8",
  };

  return (
    <div className="inline-flex items-center">
      <Loader2 className={`animate-spin text-blue-600 ${sizeClasses[size]}`} />
    </div>
  );
};

// Section loading spinner (for loading specific sections/components)
export const SectionLoader = ({ height = "h-32" }) => (
  <div
    className={`w-full ${height} flex items-center justify-center bg-gray-50 rounded-lg`}>
    <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
  </div>
);

// Card loading skeleton
export const CardSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-48 bg-gray-200 rounded-lg w-full"></div>
    <div className="space-y-3 mt-4">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
);

// Usage examples component
export const LoadingExamples = () => (
  <div className="space-y-8 p-4">
    <div>
      <h3 className="text-lg font-semibold mb-2">Button Loading</h3>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
        disabled>
        <ButtonLoader />
        <span>Loading...</span>
      </button>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-2">Inline Loading</h3>
      <div className="space-x-4">
        <InlineLoader size="small" />
        <InlineLoader size="medium" />
        <InlineLoader size="large" />
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-2">Section Loading</h3>
      <SectionLoader />
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-2">Card Skeleton</h3>
      <div className="grid grid-cols-3 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  </div>
);

// Default export for simple loading spinner
const Loading = ({ size = "medium", className = "" }) => {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-6 w-6",
    large: "h-8 w-8",
  };

  return (
    <Loader2
      className={`animate-spin text-blue-600 ${sizeClasses[size]} ${className}`}
    />
  );
};

export default Loading;
