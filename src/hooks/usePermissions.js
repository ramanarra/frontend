import { useMemo } from 'react'

function usePermissions(permissions) {
  const isAllowedPermissions = useMemo(() => {
    const storeData = localStorage.getItem('rolesPermission')

    const rolePermissions = storeData ? JSON.parse(storeData) : []

    if (permissions && rolePermissions?.length > 0) {
     return permissions.map((permission) => {
        const allowedPermissions = rolePermissions.filter((roles) => {
          return roles.name.includes(permission)
        })

        if (allowedPermissions.length <= 0) {
          return false
        }

        return true
      })
    }

    return []
  }, [permissions])

  return isAllowedPermissions
}

export default usePermissions
