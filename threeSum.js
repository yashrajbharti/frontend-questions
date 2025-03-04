const twoSum = (j, nums, target) => {
    let k = nums.length - 1;
    let result = [];

    while (j < k) {
        if (nums[j] + nums[k] > target)
            k--
        else if (nums[j] + nums[k] < target)
            j++
        else {
            result.push([target * -1, nums[j], nums[k]])
            while (j < k && nums[j] === nums[j + 1]) j++
            while (j < k && nums[k] === nums[k - 1]) k--
            j++
            k--
        }
    }
    return result;
}

const threeSum = (nums) => {
    nums.sort((a, b) => a - b);
    const result = []
    for (let i = 0; i < nums.length; i++) {
        const target = nums[i] * -1;
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        result.push(...twoSum(i + 1, nums, target))
    }
    return result;
};
