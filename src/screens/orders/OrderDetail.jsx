import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import apiService from "../../redux/apiService";
import Heading from "../../common/Heading";

const OrderDetail = ({ route }) => {
  const { item: order } = route.params;
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({}); // Initialized as an empty object
  const [error, setError] = useState(null);

  const getOrderDetails = async () => {
    try {
      const res = await apiService({
        endpoint: "truck_owner/get/booking/details",
        method: "POST",
        data: { OrderId: order.OrderId },
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Order Detail Response:", res);
      setOrderDetails(res.data?.[0] || {}); // Ensure orderDetails doesn't break if empty
    } catch (error) {
      console.error("Error fetching order details:", error);
      setError("Failed to fetch order details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  const handleCall = (phoneNumber) => {
    if (!phoneNumber) {
      Alert.alert("Error", "Phone number not available");
      return;
    }
    Linking.openURL(`tel:${phoneNumber}`).catch(() =>
      Alert.alert("Error", "Failed to open dialer")
    );
  };

  const handleDownloadInvoice = () => {
    if (!orderDetails.ChallanFile) {
      Alert.alert("Error", "No invoice available to download");
      return;
    }
    const invoiceUrl = `https://yourserver.com/path/to/invoices/${orderDetails.ChallanFile}`;
    Linking.openURL(invoiceUrl).catch(() =>
      Alert.alert("Error", "Failed to open invoice")
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#009688" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={getOrderDetails}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <Heading leftIcon={true} heading={"Order Details"} rightAction={<Text />} />
      <ScrollView style={styles.container}>
        {/* Order Details */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.title}>Order Details</Text>
            <Text style={styles.status}>{orderDetails.StatusName}</Text>
          </View>
          <Text style={styles.label}>
            Order OTP: <Text style={styles.value}>{orderDetails.OrderOTP}</Text>
          </Text>
          <Text style={styles.label}>
            Order Id: <Text style={styles.value}>{orderDetails.OrderId}</Text>
          </Text>
          <Text style={styles.label}>
            Origin: <Text style={styles.value}>{orderDetails.OriginRoute}</Text>
          </Text>
          <Text style={styles.label}>
            Destination: <Text style={styles.value}>{orderDetails.DestinationRoute}</Text>
          </Text>
          <Text style={styles.label}>
            Booking Date: <Text style={styles.value}>{orderDetails.BookingDate}</Text>
          </Text>
          <Text style={styles.label}>
            Material Type: <Text style={styles.value}>{orderDetails.GoodsTypeName}</Text>
          </Text>
          <Text style={styles.label}>
            Weight: <Text style={styles.value}>{orderDetails.Weight} {orderDetails.WeightType}</Text>
          </Text>
          <Text style={styles.label}>
            Truck Number: <Text style={styles.value}>{orderDetails.TruckNumber}</Text>
          </Text>
          <Text style={styles.label}>
            Company Name: <Text style={styles.value}>{orderDetails.CompanyName}</Text>
          </Text>
        </View>

        {/* Payment Details */}
        <View style={styles.card}>
          <Text style={styles.title}>Payment Details</Text>
          <View style={styles.divider} />
          <Text style={styles.label}>
            Payment Type: <Text style={styles.value}>{orderDetails.PaymentType}</Text>
          </Text>
          <Text style={styles.label}>
            Discount: <Text style={styles.value}>₹ {orderDetails.Discount}</Text>
          </Text>
          <Text style={styles.label}>
            Advance Amt: <Text style={styles.value}>₹ {orderDetails.AdvanceAmount}</Text>
          </Text>
          <Text style={styles.label}>
            Total Amount: <Text style={styles.value}>₹ {orderDetails.Amount}</Text>
          </Text>
        </View>

        {/* Contact & Download Buttons */}
        <TouchableOpacity style={styles.button} onPress={handleDownloadInvoice}>
          <Text style={styles.buttonText}>DOWNLOAD INVOICE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#f44336" }]}
          onPress={() => handleCall(orderDetails.CompanyPhoneNumber)}
        >
          <Text style={styles.buttonText}>CALL COMPANY</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#f5f5f5",
    marginBottom:16
    // flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  status: {
    backgroundColor: "#f8b400",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 4,
  },
  value: {
    fontWeight: "bold",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#009688",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  retryButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ff9800",
    borderRadius: 5,
  },
  retryText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
