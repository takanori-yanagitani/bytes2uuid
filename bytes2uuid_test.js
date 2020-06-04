const bytes2uuid = require("./bytes2uuid")

describe("node", () => {

describe("bytes2uuid.js", () => {

  describe("uuid_from_dv", () => {

    test("zero", () => Promise.resolve(new ArrayBuffer(16))
      .then(ab => new DataView(ab))
      .then(dv => bytes2uuid.from_dv(dv))
      .then(uuid => expect(uuid).toStrictEqual([0,0,0,0]))
    )

  })

  describe("stringify", () => {
    test("epoch", () => Promise.resolve(0x19700101)
      .then(e => [e,e,e,e])
      .then(bytes2uuid.stringify)
      .then(s => expect(s).toBe("19700101197001011970010119700101"))
    )
  })

  describe("beautify", () => {
    test("epoch", () => Promise.resolve(0x19700101)
      .then(e => [e,e,e,e])
      .then(bytes2uuid.beautify)
      .then(s => expect(s).toBe("19700101-1970-0101-1970-010119700101"))
    )

    test("f1", () => Promise.resolve(0x19700101)
      .then(e => [0xf1234567,e,e,e])
      .then(bytes2uuid.beautify)
      .then(s => expect(s).toBe("f1234567-1970-0101-1970-010119700101"))
    )

    test("f2", () => Promise.resolve(0x19700101)
      .then(e => [e,0xf1234567,e,e])
      .then(bytes2uuid.beautify)
      .then(s => expect(s).toBe("19700101-f123-4567-1970-010119700101"))
    )

    test("f3", () => Promise.resolve(0x19700101)
      .then(e => [e,e,0xf1234567,e])
      .then(bytes2uuid.beautify)
      .then(s => expect(s).toBe("19700101-1970-0101-f123-456719700101"))
    )

    test("f4", () => Promise.resolve(0x19700101)
      .then(e => [e,e,e,0xf1234567])
      .then(bytes2uuid.beautify)
      .then(s => expect(s).toBe("19700101-1970-0101-1970-0101f1234567"))
    )
  })

})

})
