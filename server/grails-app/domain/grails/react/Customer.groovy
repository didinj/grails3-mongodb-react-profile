package grails.react

import grails.rest.*

@Resource(uri='/customer')
class Customer {

  String name
  String address
  String city
  String postalCode
  String phone

  static constraints = {
      name blank:false
      address blank:false
      city blank:false
      postalCode blank:false
      phone blank:false
  }

  String toString() {
    name
  }
}
