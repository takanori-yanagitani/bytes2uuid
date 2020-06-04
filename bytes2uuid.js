(function(g,f){
  const n = [ typeof module ]
    .filter(function(t){ return "object" === t })
    .map(function(_){ return typeof module.exports })
    .filter(function(t){ return "object" === t })
    .map(function(_){ return true })
  const m = n[0] || false

  const nf = function(){ f(module.exports) }
  const bf = function(){
    g.Bytes2UUID = {}
    f(g.Bytes2UUID)
  }

  return m ? nf() : bf()
})(this, function(e){

const byte2hex1 = function(){
  const b8map = Array.from({length:256})
    .map(function(_,i){ return 0x100 + i })
    .map(function(i){ return i.toString(16) })
    .map(function(s){ return s.substring(1) })
  return function(b){ return b8map[b] }
}

const byte2hex = byte2hex1()

const align_default = ~31
const limit_default = 16777215

const dv2u5 = function(dv, offset, littleEndian){
  const o = offset       || 0
  const l = littleEndian || false
  return [
    dv.getUint32(o+ 0, l),
    dv.getUint32(o+ 4, l),
    dv.getUint32(o+ 8, l),
    dv.getUint32(o+12, l),
  ]
}

const uuid_dv2u5 = function(dv, offset, littleEndian){
  return dv2u5(dv, 0, littleEndian)
}

const u33s = function(a,b){ return byte2hex(a) + byte2hex(b) }
const u3333s = function(a,b,c,d){ return byte2hex(a) + byte2hex(b) + byte2hex(c) + byte2hex(d) }

const u4s = function(u4){ return u33s(u4 >>> 8, u4 & 0xff) }
const u5s = function(u5){ return u3333s(
  u5 >>> 24,
  u5 >>> 16 & 0xff,
  u5 >>>  8 & 0xff,
  u5        & 0xff
) }

const stringify = function(lu5){ return u5s(lu5[0]) + u5s(lu5[1]) + u5s(lu5[2]) + u5s(lu5[3]) }

const beautify = function(lu5){
  const a  = lu5[0]
  const bc = lu5[1]
  const de = lu5[2]
  const f  = lu5[3]
  return [
    u5s(a),
    u4s(bc >>> 16), u4s(bc & 0xffff),
    u4s(de >>> 16),
    u4s(de & 0xffff) + u5s(f),
  ].join("-")
}

e.data_view2uint32      = dv2u5
e.from_dv               = uuid_dv2u5

e.stringify = stringify
e.beautify  = beautify

})
