import * as yup from 'yup';

export const userSchema = yup.object().shape({
  firstName: yup.string().lowercase().max(25).required(),
  lastName: yup.string().max(25).required(),
  password: yup.string().min(6).optional(),
  email: yup.string().email().required(),
  phoneNumber: yup.number().optional(),
  country: yup.string().min(4).optional(),
  username: yup.string().optional(),
  isActive: yup.boolean().optional(),
});
