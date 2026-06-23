const _0x3e7d=(function(){
    const _0x12ab=[
        'document','cookie','split','length','pop','shift',
        'replace','toString','random','getFullYear',
        'getMonth','padStart','getDate','getHours',
        'getMinutes','getSeconds','getMilliseconds',
        'join','open','write','Math'
    ];

    return function(_0x4f){
        return _0x12ab[_0x4f];
    };
})();

(function(_0x5d,_0x7a){
    while(--_0x7a){
        _0x5d.push(_0x5d.shift());
    }
})(['x'],0x1);

const _0x1a=function(_0x2b){
    return _0x3e7d(_0x2b);
};

const getCookie=(function(){
    const _0x4a=function(_0x7b){
        return function(_0x8c){
            const _0x9d=('; '+window[_0x1a(0)][_0x1a(1)]);
            const _0xae=_0x9d[_0x1a(2)]('; '+_0x8c+'=');

            switch(_0xae[_0x1a(3)]){
                case 0x2:
                    return _0xae[_0x1a(4)]()[_0x1a(2)](';')[_0x1a(5)]();
                default:
                    return void 0;
            }
        };
    };

    return _0x4a(0x0);
})();

function generateUUID(){

    const _0x5b=function(_0x6c){
        return (_0x6c==='x')
            ?((window[_0x1a(20)][_0x1a(8)]()*0x10)|0)
            :((((window[_0x1a(20)][_0x1a(8)]()*0x10)|0)&0x3)|0x8);
    };

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    [_0x1a(6)](/[xy]/g,function(_0x7d){

        let _0x8e;

        for(;;){
            _0x8e=_0x5b(_0x7d);
            break;
        }

        return _0x8e[_0x1a(7)](0x10);
    });
}

function getTimestamp(){

    const _0x11=new Date();

    const _0x12=function(_0x13,_0x14){
        return (''+_0x13)[_0x1a(11)](_0x14,'0');
    };

    const _0x15=[
        _0x11[_0x1a(9)](),
        _0x12(_0x11[_0x1a(10)]()+1,2),
        _0x12(_0x11[_0x1a(12)](),2),
        _0x12(_0x11[_0x1a(13)](),2),
        _0x12(_0x11[_0x1a(14)](),2),
        _0x12(_0x11[_0x1a(15)](),2),
        _0x12(_0x11[_0x1a(16)](),3)
    ];

    return [
        _0x15[0],
        '-',
        _0x15[1],
        '-',
        _0x15[2],
        'T',
        _0x15[3],
        ':',
        _0x15[4],
        ':',
        _0x15[5],
        '.',
        _0x15[6],
        '000+00:00'
    ][_0x1a(17)]('');
}

function openPopups(_0x21,_0x22,_0x23){

    const _0x24=(function(){
        return window[_0x1a(18)](
            '',
            'Popup',
            [
                'width=',
                _0x21,
                ',height=',
                _0x22
            ].join('')
        );
    })();

    (function(_0x25){
        _0x25[_0x1a(0)][_0x1a(19)](_0x23);
    })(_0x24);
}

export{
    getCookie,
    generateUUID,
    getTimestamp,
    openPopups
};
