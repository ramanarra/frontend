import usePermissions from './usePermissions'

const userReadRoles = ['SELF_USER_SETTINGS_WRITE', 'ACCOUNT_USERS_SETTINGS_WRITE']

function useDocSettingWrite() {
  const [isUserSettingWrite, isAccountUserSettingWrite] = usePermissions(
    userReadRoles
  )

  return isUserSettingWrite || isAccountUserSettingWrite
}

export default useDocSettingWrite
