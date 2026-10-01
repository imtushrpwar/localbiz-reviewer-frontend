import { Text, TouchableOpacity, View } from "react-native";

import BusinessField from "./BusinessField";

interface BusinessFormProps {
  form: {
    businessName: string;
    category: string;
    phone: string;
    email: string;
    city: string;
    address: string;
    description: string;
  };
  saving: boolean;
  onSave: () => void;
  setForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function BusinessForm({
  form,
  saving,
  onSave,
  setForm,
}: BusinessFormProps) {
  return (
    <View className="rounded-3xl bg-white p-5">
      <Text className="mb-6 text-2xl font-bold">Business Profile</Text>

      <BusinessField
        label="Business Name"
        value={form.businessName}
        onChangeText={(value) =>
          setForm({
            ...form,
            businessName: value,
          })
        }
      />

      <BusinessField
        label="Category"
        value={form.category}
        onChangeText={(value) =>
          setForm({
            ...form,
            category: value,
          })
        }
      />

      <BusinessField
        label="Phone"
        value={form.phone}
        keyboardType="phone-pad"
        onChangeText={(value) =>
          setForm({
            ...form,
            phone: value,
          })
        }
      />

      <BusinessField
        label="Email"
        value={form.email}
        keyboardType="email-address"
        onChangeText={(value) =>
          setForm({
            ...form,
            email: value,
          })
        }
      />
      <BusinessField
        label="City"
        value={form.city}
        onChangeText={(value) =>
          setForm({
            ...form,
            city: value,
          })
        }
      />

      <BusinessField
        label="Address"
        value={form.address}
        onChangeText={(value) =>
          setForm({
            ...form,
            address: value,
          })
        }
      />

      <BusinessField
        label="Description"
        value={form.description}
        multiline
        onChangeText={(value) =>
          setForm({
            ...form,
            description: value,
          })
        }
      />

      <TouchableOpacity
        className="mt-6 rounded-2xl bg-blue-600 p-4"
        disabled={saving}
        onPress={onSave}
      >
        <Text className="text-center font-bold text-white">
          {saving ? "Saving..." : "Save Changes"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
