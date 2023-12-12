// Import necessary dependencies
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AeroSpaceController } from 'src/services/controllers';
import { GetSpectrumStatus } from 'src/types';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

//  context props
interface SpectrumStatusContextProps {
  spectrumOverviewNumbers?: GetSpectrumStatus;
  isActionLoading: boolean;
  isStatuesUpdated: boolean;
  getSpectrumStatusData: () => Promise<void>;
  handleIsRequiredAction: () => Promise<void>;
}


const SpectrumStatusContext = createContext<SpectrumStatusContextProps | undefined>(undefined);

// Context provider
export const SpectrumStatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  
  // State variables for spectrum overview numbers, action loading status, and statues update status
  const [spectrumOverviewNumbers, setSpectrumOverviewNumbers] = useState<GetSpectrumStatus>();
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isStatuesUpdated, setIsStatuesUpdated] = useState(false);

  // Next.js router instance
  const router = useRouter();

  // AeroSpaceController instance for making API requests
  const aeroSpaceController = new AeroSpaceController(router);

  // Function to fetch spectrum status data
  const getSpectrumStatusData = useCallback(async () => {
    const response = await aeroSpaceController.GetSpectrumStatus();
    if (!response) return;

    setSpectrumOverviewNumbers(response);
  }, [router]);

  // Function to handle required action
  const handleIsRequiredAction = async () => {
    setIsActionLoading(true);

    // Call API to get required action status
    const statusResponse = await aeroSpaceController.GetIsRequiredAction();

    // Update state based on API response
    if (statusResponse === 200) {
      setIsStatuesUpdated(true);
      toast.success('Action successfully completed!', { id: 'loading' });
    } else {
      setIsStatuesUpdated(false);
      toast.error('Action Unsuccessfully completed!', { id: 'loading' });
    }

    setIsActionLoading(false);
  };

  // Effect to fetch spectrum status data when statues are updated
  useEffect(() => {
    getSpectrumStatusData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStatuesUpdated]);

  // Context value to be provided to consumers
  const contextValue: SpectrumStatusContextProps = {
    spectrumOverviewNumbers,
    isActionLoading,
    isStatuesUpdated,
    getSpectrumStatusData,
    handleIsRequiredAction,
  };

  // Provide the context value to children components
  return <SpectrumStatusContext.Provider value={contextValue}>{children}</SpectrumStatusContext.Provider>;
};


export const useSpectrumStatus = () => {
  // Get context from the provider
  const context = useContext(SpectrumStatusContext);

  // Throw an error if used outside of the provider
  if (!context) {
    throw new Error('useSpectrumStatus must be used within a SpectrumStatusProvider');
  }

  // Return the context
  return context;
};
