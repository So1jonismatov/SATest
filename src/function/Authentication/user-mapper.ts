import { type User as AppUser } from '@/types';
import { type User as ApiUser } from '@/api/real/types';

export const mapApiUserToAppUser = (apiUser: ApiUser): AppUser => {
  const { id, full_name, email, role } = apiUser;

  const baseAppUser = {
    id: id.toString(),
    name: full_name,
    email,
    role,
    // Providing default values for fields not present in the API response
    phone: email || '', // Using email as phone for now since we don't have phone in the new API
    status: 'Active' as const,
  };

  if (role === 'student') {
    return {
      ...baseAppUser,
      role: 'student',
      parentId: null,
      teacherIds: [],
    };
  } else if (role === 'teacher') {
    return {
      ...baseAppUser,
      role: 'teacher',
      studentIds: [],
    };
  }

  // Fallback for any unexpected role
  throw new Error(`Unknown user role: ${role}`);
};
