
var numberOfStableArrays = function(zero, one, limit) {
    const MOD = 1e9 + 7;

   
    const dp0 = Array.from({ length: zero + 1 }, () => new BigInt64Array(one + 1));
    const dp1 = Array.from({ length: zero + 1 }, () => new BigInt64Array(one + 1));

    const mod = BigInt(MOD);

    // Base cases: arrays with only one type of digit
    for (let i = 1; i <= Math.min(zero, limit); i++) {
        dp0[i][0] = 1n;
    }
    for (let j = 1; j <= Math.min(one, limit); j++) {
        dp1[0][j] = 1n;
    }

    for (let i = 1; i <= zero; i++) {
        for (let j = 1; j <= one; j++) {
          
            dp0[i][j] = (dp0[i - 1][j] + dp1[i - 1][j]) % mod;
            if (i > limit) {
                dp0[i][j] = (dp0[i][j] - dp1[i - limit - 1][j] + mod) % mod;
            }

            
            dp1[i][j] = (dp1[i][j - 1] + dp0[i][j - 1]) % mod;
            if (j > limit) {
                dp1[i][j] = (dp1[i][j] - dp0[i][j - limit - 1] + mod) % mod;
            }
        }
    }

    return Number((dp0[zero][one] + dp1[zero][one]) % mod);
};
