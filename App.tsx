/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [dob, setDob] = useState('');
  const [students, setStudents] = useState<{ id: string, name: string, className: string, dob: string }[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());
const [showDatePicker, setShowDatePicker] = useState(false);


  const removeStudent = (studentId: string) => {
    setStudents(prevStudents =>
      prevStudents.filter(student => student.id !== studentId)
    );
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false); // Ẩn DatePicker sau khi người dùng đã chọn
    setDate(currentDate); // Lưu ngày được chọn vào trạng thái
    setDob(currentDate.toLocaleDateString()); // Cập nhật giá trị trong ô nhập ngày sinh
  };

  const editStudent = (studentId: string) => {
    const studentToEdit = students.find(student => student.id === studentId);
    if (studentToEdit) {
      setName(studentToEdit.name);
      setClassName(studentToEdit.className);
      setDob(studentToEdit.dob);
      setIsEditing(true);
      setEditingId(studentId);
    }
  };

  const addOrUpdateStudent = () => {
    if (isEditing) {
      // Nếu đang ở chế độ chỉnh sửa, cập nhật thông tin của sinh viên
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.id === editingId ? { ...student, name, className, dob } : student
        )
      );
      setEditingId(null);
      setIsEditing(false);
    } else {
      // Nếu không, thêm mới sinh viên
      setStudents(prevStudents => [
        ...prevStudents,
        { id: Math.random().toString(), name, className, dob }
      ]);
    }
    setName('');
    setClassName('');
    setDob('');
  };

  const renderItem = ({ item }: { item: { id: string, name: string, className: string, dob: string } }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <Text>{item.className}</Text>
      <Text>{item.dob}</Text>
      <Button
        title="Xóa"
        onPress={() => removeStudent(item.id)}
      />
      <Button
        title="Chỉnh sửa"
        onPress={() => editStudent(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Tên"
          style={styles.input}
          onChangeText={setName}
          value={name}
        />
        <TextInput
          placeholder="Lớp"
          style={styles.input}
          onChangeText={setClassName}
          value={className}
        />
        <TextInput
          placeholder="Ngày sinh"
          style={styles.input}
          onChangeText={setDob}
          value={dob}
        />
        <Button title={isEditing ? "Cập nhật" : "Thêm"} onPress={addOrUpdateStudent} />

      </View>
      <FlatList
        style={styles.list}
        data={students}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  list: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});