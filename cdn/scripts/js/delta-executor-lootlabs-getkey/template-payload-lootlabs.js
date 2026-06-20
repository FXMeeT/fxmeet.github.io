const payload = {
  tid: 1015561,
  bl: [10],
  session: "683901432099450679",
  max_tasks: 2,
  design_id: 135,
  cur_url: "https://links.lootlabs.gg/s?fJjn&data=ropKerF1C%2BDVFRHtlJ4B3stRPx3lFEDYB2oDjB3ThPRPyWAr6z41hpNGYGR9L82lDVbnppQ5RKEbmZ0yNT8ouQyd6RvuqJ4z2YjRVkM4xgWqWyuPI7W355vWQUoH1wyUNg4DzHk1726Ny%2BXlZCT%2FzYNetvoPfh4dFA%2BoT%2Fhy0VdmQS6a%2BYHV0CymqrueOiCYpy9JkqjVRTw1%2BdiLYO4j0%2FG9VqZNqtrZf4UdkLNA%2FISwM0cOYjK5naI5MH3JssM%2F0Wsn5v0WyxcrbtqtVsnLWoRJ6ejS6eOirzMP9oOLZ%2Fax4OVpM1THm60ZwPNRzg4ZPPFLr0Xc%2BE8OCl002BccffHvetikttY%2BZdSQbPjggFmJhbWjPTF2cZaJLyyftSmImGr9ezY5OsV59UH4p781sBtihZtlKhU3kHizeT0wUY3qFh1yVFJX1DY7R8DKI6PRA8rR7dC02c94rPn%2Fw2m1V7eVU7583zEk93%2F5zRXZHxG%2FkP5f3lASa9KIdaQJqIX5DHbAJx%2BLDL2DXsTmzu9J93eEy25nx9ZWKSqgcWQ5ULTA8XBcDslh%2BVdjLYBaSXGoil5A4CzX2awXm7uRlPrCEe3LWh6Lgla008OWkcZCXwjnap2y23NnWu9C0mNDW5mtpd97wl4LWd2qqLS4p0QsUpZH%2FCWIwVXUAg%2Bz5uqZ3sGdEYe1UQ8GMKclNbyiSq9C",
  doc_ref: "",
  tier_id: "4",
  num_of_tasks: "2",
  is_loot: true,
  rkey: "821800156866885790",
  cookie_id: "115390967",
  botd: "{\"bot\":false,\"timestamp\":1781993627770,\"webGLSolution\":{\"uuid\":\"D64D5b27-5378-42C7-85e2-0bdD10b0f92d\",\"nonce\":577,\"time\":3333},\"encrypted\":\"cqVIrBMvKefi2OTLUemQ1uoddqYU2OxeQQD6oHqSN+gYHJK2Oz+HoAlHn4Dr9S5IYjyOQ93m1IhsN458TTouIwS4Mxl4DRaf7qaNwbKz98MpGVwcmcEku/4Q7fGgdc9ZbcWytqqOMoBrbxXstLI460Ja0nkrtsPaDrVHSUyxhv2MkXttKiIaM6ZJwSNSO6wimL3pyVsb6N0jYG4=\"}",
  botds: "D64D5b27-5378-42C7-85e2-0bdD10b0f92d",
  offer: "0",
  ver: "v1",
  test_unlocker_app: -1,
  allow_unlocker: true,
  show_unlocker: true,
  desktop_design: 0,
  unlocker_only: 0,
  additional_info: {},
  taboola_user_sync: "9271c54e-45f3-4f70-aba7-4f29ae03f6dd-tuct112650a1"
};

fetch("https://nerventualken.com/tc", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
})
.then(r => r.text())
.then(console.log)
.catch(console.error);
