import { StackProps } from '@mui/material/Stack';
import { Variant } from '@mui/material/styles/createTypography';

export type EmptyContentProps = StackProps & {
  title?: string;
  imgUrl?: string;
  filled?: boolean;
  description?: string;
  action?: React.ReactNode;
  titleVariant?: Variant;
};
