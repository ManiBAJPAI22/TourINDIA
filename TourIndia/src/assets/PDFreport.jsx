import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 30,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: "#007BFF", // Blue color for the heading
  },
  content: {
    fontSize: 12,
    marginBottom: 8,
    color: "#333", // Dark gray color for the content
  },
  section: {
    marginBottom: 20,
  },
});

const ReportPDF = ({ formData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.heading}>Generated Report</Text>

          <View style={styles.section}>
            <Text style={styles.content}>
              Nationality: {formData.nationality}
            </Text>
            <Text style={styles.content}>
              Type of Visit: {formData.typeOfVisit}
            </Text>
            <Text style={styles.content}>
              Cities Visited: {formData.selectedCities.join(", ")}
            </Text>
            <Text style={styles.content}>
              Accommodation Preferences: {formData.accommodation}
            </Text>
            <Text style={styles.content}>Budget: {formData.budget}</Text>
            <Text style={styles.content}>
              Number of Adults: {formData.numAdults}
            </Text>
            <Text style={styles.content}>
              Number of Children: {formData.numChildren}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.content}>Special Care:</Text>
            <View style={{ paddingLeft: 20 }}>
              <Text style={styles.content}>
                Child Care: {formData.specialCare.childCare ? "Yes" : "No"}
              </Text>
              <Text style={styles.content}>
                Health Care: {formData.specialCare.healthCare ? "Yes" : "No"}
              </Text>
              <Text style={styles.content}>
                Entertainment: {formData.specialCare.entertainment ? "Yes" : "No"}
              </Text>
            </View>
            <Text style={styles.content}>
              Sightseeing and Activities: {formData.sightseeing ? "Yes" : "No"}
            </Text>
            {formData.specialCare.healthCare && (
              <Text style={styles.content}>
                Specific Health Care Demands: {formData.healthCareDemands}
              </Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.content}>
              Additional Information: {formData.additionalInfo}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ReportPDF;
