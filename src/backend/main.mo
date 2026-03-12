import Text "mo:core/Text";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Principal "mo:core/Principal";

actor {
  type Inquiry = {
    id : Nat;
    name : Text;
    phone : Text;
    school : Text;
    city : Text;
    state : Text;
    message : Text;
  };

  module Inquiry {
    public func compare(a : Inquiry, b : Inquiry) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  let inquiries = Map.empty<Nat, Inquiry>();
  var nextInquiryId = 1;

  let admins = Map.fromIter([(Principal.fromText("2vxsx-fae"), ())].values());

  public shared ({ caller }) func submitInquiry(name : Text, phone : Text, school : Text, city : Text, state : Text, message : Text) : async Nat {
    let inquiry : Inquiry = {
      id = nextInquiryId;
      name;
      phone;
      school;
      city;
      state;
      message;
    };

    inquiries.add(nextInquiryId, inquiry);
    nextInquiryId += 1;
    inquiry.id;
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    if (not admins.containsKey(caller)) {
      Runtime.trap("Only admins can view all inquiries.");
    };

    inquiries.values().toArray().sort();
  };
};
