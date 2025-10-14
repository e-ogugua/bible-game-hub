import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import React Three Fiber to completely avoid SSR issues
const CanvasWithFiber = dynamic(() => import('./CanvasWithFiber').then(mod => ({ default: mod.CanvasWithFiber })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 md:h-80 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
        <p className="text-sm">Loading 3D scene...</p>
      </div>
    </div>
  )
});

interface Scene3DProps {
  children: React.ReactNode;
  className?: string;
}

export const Scene3D: React.FC<Scene3DProps> = ({ children, className = "" }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render anything during SSR to prevent React Three Fiber initialization issues
  if (!isClient) {
    return (
      <div className={`w-full h-64 md:h-80 ${className} bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg flex items-center justify-center`}>
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
          <p className="text-sm">Loading 3D scene...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-64 md:h-80 ${className}`}>
      <CanvasWithFiber>
        {children}
      </CanvasWithFiber>
    </div>
  );
};
