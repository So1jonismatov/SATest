import { type User as AppUser } from '@/types';
import { type User as ApiUser } from '@/api/real/types';

export const mapApiUserToAppUser = (apiUser: ApiUser): AppUser => {
  const { id, first_name, last_name, phone_number, role } = apiUser;

  const baseAppUser = {
    id: id.toString(),
    name: `${first_name} ${last_name}`,
    phone: phone_number,
    role,
    // Providing default values for fields not present in the API response
    email: '',
    status: 'Active' as const,
  };

  if (role === 'student') {
    return {
      ...baseAppUser,
      role: 'student',
      class: apiUser.class_id?.toString() || '',
      parentId: null,
      teacherIds: [],
    };
  } else if (role === 'parent') {
    return {
      ...baseAppUser,
      role: 'parent',
      childrenIds: [],
    };
  } else if (role === 'teacher') {
    return {
      ...baseAppUser,
      role: 'teacher',
      studentIds: [],
    };
  } else if (role === 'admin') {
    return {
      ...baseAppUser,
      role: 'admin',
    };
  }

  // Fallback for any unexpected role
  throw new Error(`Unknown user role: ${role}`);
};
