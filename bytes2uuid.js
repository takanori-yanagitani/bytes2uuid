(function(g,f){
  const n = [ typeof module ]
    .filter(function(t){ return "object" === t })
    .map(function(_){ return typeof module.exports })
    .filter(function(t){ return "object" === t })
    .map(function(_){ return true })
  const m = n[0] || false

  const nf = function(){ f(module.exports) }
  const bf = function(){
    g.Bytes2UUID = {n}
    f(g.Bytes2UUID)
  }

  return m ? nf() : bf()
})(this, function(e){

const _byte2hex1 = function(){
  const b8map = Array.from({length:256})
    .map(function(_,i){ return 0x100 + i })
    .map(function(i){ return i.toString(16) })
    .map(function(s){ return s.substring(1) })
  return function(b){ return b8map[b] }
}

const align_default = ~31
const limit_default = 16777215

const ab2dv = function(ab, offset, align, limit){
  const o = offset || 0
  const a = align  || align_default
  const l = limit  || limit_default
  const bl = ab.byteLength
  const aligned = bl & align
  const limited = aligned & limit
  return new DataView(ab, o, limited)
}

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

e.array_buffer2dataview = ab2dv
e.data_view2uint32      = dv2u5
e.from_dv               = uuid_dv2u5

})
