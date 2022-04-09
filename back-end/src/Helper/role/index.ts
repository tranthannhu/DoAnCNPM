export async function CheckPossessionRole(roles: Array<any>, method: string) {
  let posession = '';
  await roles.forEach(role => {
    if (role.split('_')[1] == method) {
      posession = role.split('_')[2];
    }
  });
  return posession;
}
