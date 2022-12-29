import sharedTest from 'shared';
import CommonUtility from 'shared/lib/commonUtility';
import RandomUtility from 'shared/lib/randomUtility';

(async function () {
    await CommonUtility.delay(5000);
    sharedTest(RandomUtility.next(0, 100));
})();
