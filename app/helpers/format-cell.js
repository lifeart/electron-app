import { helper } from '@ember/component/helper';

export default helper(function formatCell([r,c]/*, hash*/) {
  return `[${r+1},${c+1}]`;
});