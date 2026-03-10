/**
 * @param {number} m
 * @param {number} k
 * @param {number[]} nums
 * @return {number}
 */
var magicalSum = function(m, k, nums) {
    const MOD = 1000000007n;
    const n = nums.length;

   
    const C = Array.from({ length: m + 1 }, () => new BigInt64Array(m + 1));
    for (let i = 0; i <= m; i++) {
        C[i][0] = 1n;
        for (let j = 1; j <= i; j++) {
            C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
        }
    }

  
    const pows = Array.from({ length: n }, () => new BigInt64Array(m + 1));
    for (let i = 0; i < n; i++) {
        pows[i][0] = 1n;
        let base = BigInt(nums[i]);
        for (let count = 1; count <= m; count++) {
            pows[i][count] = (pows[i][count - 1] * base) % MOD;
        }
    }

    
    const memo = new Map();

    function solve(idx, picked, setBits, carry) {
     
        if (idx === n) {
            let finalSetBits = setBits;
            let tempCarry = carry;
            while (tempCarry > 0) {
                if (tempCarry & 1) finalSetBits++;
                tempCarry >>= 1;
            }
            return (picked === m && finalSetBits === k) ? 1n : 0n;
        }

        // State key: index, elements picked, bits used, current carry
        const key = `${idx},${picked},${setBits},${carry}`;
        if (memo.has(key)) return memo.get(key);

        let res = 0n;
        
        // Decide how many times (count) to use nums[idx]
        for (let count = 0; count <= (m - picked); count++) {
            const currentSum = count + carry;
            const nextCarry = currentSum >> 1;
            const bit = currentSum & 1;

            if (setBits + bit <= k) {
                
                let ways = C[m - picked][count];
                let val = pows[idx][count];
                
                let sub = solve(idx + 1, picked + count, setBits + bit, nextCarry);
                
                if (sub > 0n) {
                    let term = (ways * val) % MOD;
                    res = (res + (term * sub)) % MOD;
                }
            }
        }

        memo.set(key, res);
        return res;
    }

    return Number(solve(0, 0, 0, 0));
};
