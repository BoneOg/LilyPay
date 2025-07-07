import React, { useState } from 'react';
import { View, Text, Pressable, Modal, TouchableOpacity } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { getColor, getBorderRadius, getContainerStyles, getShadowStyles, getBorderStyles, theme } from '../../components/theme';

interface TableSelectorProps {
  selected: number | null;
  onTableSelect: (index: number) => void;
}

const TableSelector: React.FC<TableSelectorProps> = ({ selected, onTableSelect }) => {
  const containerStyles = getContainerStyles();
  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState('');

  const handleNumberPress = (num: string) => {
    if (input.length < 3) setInput(input + num);
  };
  const handleClear = () => setInput('');
  const handleCancel = () => {
    setInput('');
    setModalVisible(false);
  };
  const handleConfirm = () => {
    const tableNum = parseInt(input, 10);
    if (!isNaN(tableNum) && tableNum > 0) {
      onTableSelect(tableNum - 1);
    }
    setInput('');
    setModalVisible(false);
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: getColor('card'), 
      justifyContent: 'center', 
      alignItems: 'center',
      borderRadius: getBorderRadius('lg'), 
      paddingHorizontal: containerStyles.paddingHorizontal,
      ...getShadowStyles('sm'), 
      ...getBorderStyles('sm', 'border'),
    }}>
      {/* Header Row with Map Pin, Text, and Dynamic Table Badge */}
      <View style={{
        width: '100%', 
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop: 12, 
        justifyContent: 'space-between'
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MapPin width={24} height={24} color={getColor('primary.500')} />
          <Text style={{
            marginLeft: 8, 
            fontSize: 18, 
            fontFamily: theme.fonts.semibold,
            color: getColor('primary.700'),
          }}>
            Select Table
          </Text>
        </View>
        {selected !== null && (
          <View style={{
            backgroundColor: getColor('primary.500'), 
            borderRadius: getBorderRadius('md'),
            paddingHorizontal: 8, 
            paddingVertical: 4, 
            ...getShadowStyles('sm'),
          }}>
            <Text style={{
              fontSize: 12, 
              fontFamily: theme.fonts.bold,
              color: getColor('primary.foreground'),
            }}>
              Table {selected + 1}
            </Text>
          </View>
        )}
      </View>

      {/* Enter the Table Button */}
      <View style={{
        width: '100%', 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 6
      }}>
        <Pressable
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: getColor('muted'),
            borderRadius: getBorderRadius('md'), 
            width: '100%',
            height: '80%',
            justifyContent: 'center', 
            alignItems: 'center',
            ...getShadowStyles('sm'), 
            ...getBorderStyles('sm', 'border'),
          }}
        >
          <Text style={{
            fontSize: 18, 
            fontFamily: theme.fonts.bold,
            color: getColor('foreground'),
          }}>
            Enter the Table
          </Text>
        </Pressable>
        {/* Modal for Table Number Input */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={handleCancel}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: getColor('card'), borderRadius: getBorderRadius('lg'), padding: 24, width: 300, alignItems: 'center' }}>
              {/* Display Field */}
              <View style={{ marginBottom: 16, width: '100%', alignItems: 'center', padding: 8, borderWidth: 1, borderColor: getColor('border'), borderRadius: getBorderRadius('md'), backgroundColor: getColor('muted') }}>
                <Text style={{ fontSize: 32, fontFamily: theme.fonts.bold, color: getColor('primary.700') }}>{input || '—'}</Text>
              </View>
              {/* Calculator */}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'center', marginBottom: 16 }}>
                {[1,2,3,4,5,6,7,8,9,0].map((num, idx) => (
                  <TouchableOpacity
                    key={num}
                    onPress={() => handleNumberPress(num.toString())}
                    style={{ width: 70, height: 50, margin: 4, backgroundColor: getColor('primary.100'), borderRadius: getBorderRadius('md'), justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Text style={{ fontSize: 22, fontFamily: theme.fonts.bold, color: getColor('primary.700') }}>{num}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  onPress={handleClear}
                  style={{ width: 146, height: 50, margin: 4, backgroundColor: getColor('muted'), borderRadius: getBorderRadius('md'), justifyContent: 'center', alignItems: 'center' }}
                >
                  <Text style={{ fontSize: 18, fontFamily: theme.fonts.semibold, color: getColor('primary.700') }}>Clear</Text>
                </TouchableOpacity>
              </View>
              {/* Cancel and Confirm Buttons */}
              <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 8 }}>
                <TouchableOpacity
                  onPress={handleCancel}
                  style={{ flex: 1, marginRight: 8, backgroundColor: getColor('muted'), borderRadius: getBorderRadius('md'), paddingVertical: 12, alignItems: 'center' }}
                >
                  <Text style={{ fontSize: 16, fontFamily: theme.fonts.bold, color: getColor('primary.700') }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleConfirm}
                  style={{ flex: 1, marginLeft: 8, backgroundColor: getColor('primary.500'), borderRadius: getBorderRadius('md'), paddingVertical: 12, alignItems: 'center' }}
                >
                  <Text style={{ fontSize: 16, fontFamily: theme.fonts.bold, color: getColor('primary.foreground') }}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default TableSelector; 