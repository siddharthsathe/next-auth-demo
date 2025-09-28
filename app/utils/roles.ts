import { UserRole } from '../types';


export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
    const roleHierarchy = {
        [UserRole.USER]: 1,
        [UserRole.ADMIN]: 2
    };

    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}


export function isAdmin(userRole: UserRole): boolean {
    return userRole === UserRole.ADMIN;
}

export function isUser(userRole: UserRole): boolean {
    return userRole === UserRole.USER;
}
