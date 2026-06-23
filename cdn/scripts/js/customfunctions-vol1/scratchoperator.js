const _0x9c1f=(function(){
    const _0x3a=[
        'length','toString','charAt','abs','ceil','floor',
        'atan','acos','asin','sin','cos','log','log10',
        'sqrt','exp','random','Math'
    ];

    return function(_0x2){
        return _0x3a[_0x2];
    };
})();

const _0x7d=function(_0x1){
    return _0x9c1f(_0x1);
};

const _0x2b8a=(function(){
    const _0x5f=(a,b)=>a+b;
    const _0x6c=(a)=>!isNaN(a);

    function _0x11f(){
        return _0x7d(16);
    }

    return {
        l:(x)=>typeof x==='string'?x[_0x7d(0)]:(_0x6c(x)?x[_0x7d(1)]()[_0x7d(0)]:void 0),

        c:(n,s)=>(
            _0x6c(n)&&typeof s==='string'&&n>0&&n<=s[_0x7d(0)]
            ?s[_0x7d(2)](n-1)
            :void 0
        ),

        j:(a,b)=>_0x5f(String(a),b()),

        a:(n)=>Math[_0x7d(3)](n),
        ce:(n)=>Math[_0x7d(4)](n),
        fl:(n)=>Math[_0x7d(5)](n),

        at:(n)=>Math[_0x7d(6)](n),
        ac:(n)=>Math[_0x7d(7)](n),
        as:(n)=>Math[_0x7d(8)](n),

        si:(n)=>Math[_0x7d(9)](n),
        co:(n)=>Math[_0x7d(10)](n),

        ln:(n)=>Math[_0x7d(11)](n),
        lg:(n)=>Math[_0x7d(12)](n),

        sq:(n)=>Math[_0x7d(13)](n),
        ex:(n)=>Math[_0x7d(14)](n),

        r:(a,b)=>Math.floor(Math[_0x7d(15)]()*(b-a+1))+a,

        rp:(n,s)=>{
            let i=0;
            while(i<n){
                Function(s)();
                i++;
            }
        },

        rpu:(c,s)=>{
            while(!c()){
                Function(s)();
            }
        },

        not:(v)=>!v,

        sw:(a,b)=>{
            let i=0;
            if(b.length>a.length)return false;
            for(;;){
                if(i>=b.length)return true;
                if(a[i]!==b[i])return false;
                i++;
            }
        },

        inc:(a,b)=>{
            if(b.length===0)return true;
            let i=0;
            for(;;){
                if(i>a.length-b.length)return false;

                let m=true;
                let j=0;

                for(;;){
                    if(j>=b.length)break;
                    if(a[i+j]!==b[j]){
                        m=false;
                        break;
                    }
                    j++;
                }

                if(m)return true;
                i++;
            }
        }
    };
})();

export const {
l:lengthOf,
c:letter,
j:join,
a:absoluteOf,
ce:ceilingOf,
fl:floor,
at:atanOf,
ac:acosOf,
as:asinOf,
si:sinOf,
co:cosOf,
ln:lnOf,
lg:logOf,
sq:sqrtOf,
ex:expOf,
r:pickRandom,
rp:repeat,
rpu:repeatUntil,
not,
sw:startsWith,
inc:includes
}=_0x2b8a;
