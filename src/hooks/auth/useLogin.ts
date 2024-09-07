// import apiService from '@/src/api/apiService';
// import { HttpStatusCode } from '@/src/api/types/enums';
// import { useMutation, UseMutationOptions } from '@tanstack/react-query';
// import { z } from 'zod';


// const LoginResponseSchema = z.object({
//   code: z.string(),
//   data: z.object({
//     userId: z.string(),
//     roles: z.string(),
//     cancelReservation: z.number(),
//     acceptReservation: z.number(),
//     token: z.string(),
//     campusId: z.string(),
//     restaurantId: z.string().nullable(),
//   }),
// });

// type LoginResponse = z.infer<typeof LoginResponseSchema>;

// const login = async ({ email, password }: { email: string; password: string }): Promise<LoginResponse> => {
//   const response = await apiService.post<{ email: string; password: string }, LoginResponse>(
//     '/user/auth/login',
//     { email, password }
//   );

//   if (response.statusCode !== HttpStatusCode.OK) {
//     throw new Error('Failed to login');
//   }

//   return LoginResponseSchema.parse(response.body);
// };

// const useLogin = (
//     options?: UseMutationOptions<
//       LoginResponse,
//       Error,
//       { email: string; password: string }
//     >
//   ) => {
//     return useMutation<LoginResponse, Error, { email: string; password: string }>(
//       {
//         mutationFn: login,
//         ...options,
//       }
//     );
//   };
  
//   export default useLogin;
  