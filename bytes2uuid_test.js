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

  })

})
