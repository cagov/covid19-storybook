/**
 * @TODO add an example of what this looks like
 * @param {string} county
 */
export const schoolReopeningStatuses = function (county) {
  if (!schoolLabels) {
    return "";
  }
  if (schoolsCanReopenList.indexOf(county) > -1) {
    return schoolLabels.schools_may_reopen + schoolLabels.schools_info;
  }
  return schoolLabels.schools_may_not_reopen + schoolLabels.schools_info;
};
