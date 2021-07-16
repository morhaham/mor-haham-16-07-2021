import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

const useError = ({ msgTitle, msgDesc, error }) => {
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: msgTitle,
        description: msgDesc,
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
    }
  }, [error]);
};

export default useError;
