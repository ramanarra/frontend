import usePermissions from './usePermissions'

const userReadRoles = ['ACCOUNT_SETTINGS_WRITE']

function useHospitalSettingWrite() {
  const [isAccountSettingWrite] = usePermissions(
    userReadRoles
  )

  return isAccountSettingWrite
}

export default useHospitalSettingWrite
