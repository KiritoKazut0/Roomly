import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import  Alert from '@mui/joy/Alert';
import type { AlertProps } from '@mui/joy/Alert';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

interface ErrorMessageProps {
  message: string;
  type?: 'error' | 'warning' | 'info';
  dismissible?: boolean;
  onDismiss?: () => void;
  variant?: AlertProps['variant'];
  sx?: any;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  type = 'error',
  dismissible = false,
  onDismiss,
  variant = 'soft',
  sx = {}
}) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'info':
        return <InfoIcon />;
      default:
        return <ErrorIcon />;
    }
  };

  const getColor = (): AlertProps['color'] => {
    switch (type) {
      case 'error':
        return 'danger';
      case 'warning':
        return 'warning';
      case 'info':
        return 'primary';
      default:
        return 'danger';
    }
  };

  return (
    <Alert
      variant={variant}
      color={getColor()}
      startDecorator={getIcon()}
      endDecorator={
        dismissible && onDismiss ? (
          <IconButton
            variant="plain"
            size="sm"
            color={getColor()}
            onClick={onDismiss}
          >
            <CloseIcon />
          </IconButton>
        ) : null
      }
      sx={{
        mt: 1,
        mb: 1,
        ...sx
      }}
    >
      <Typography level="body-sm">
        {message}
      </Typography>
    </Alert>
  );
};

export default ErrorMessage;