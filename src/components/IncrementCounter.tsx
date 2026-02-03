import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import debounce from 'lodash.debounce';
import GradientBox from './Home/GradientBox';

type IncrementCounterProps = {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (value: number) => void;
};

const SIZE = 36;

const IncrementCounter: React.FC<IncrementCounterProps> = ({
    value,
    defaultValue = 1,
    min = 1,
    max = Infinity,
    step = 1,
    onChange,
}) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const currentValue = isControlled ? value : internalValue;

    /* ---------- Debounced callback ---------- */
    const debouncedChange = useCallback(
        debounce((val: number) => {
            onChange?.(val);
        }, 400),
        [onChange]
    );

    useEffect(() => {
        return () => debouncedChange.cancel();
    }, []);

    const updateValue = (newValue: number) => {
        if (newValue < min || newValue > max) return;
        if (!isControlled) setInternalValue(newValue);
        debouncedChange(newValue);
    };

    const increment = () => updateValue(currentValue + step);
    const decrement = () => updateValue(currentValue - step);

    return (
        <View style={styles.container}>
            {/* -------- DECREMENT (BLACK) -------- */}
            <TouchableOpacity
                style={[
                    styles.circleButton,
                    styles.decrementButton,
                    currentValue <= min && styles.disabled,
                ]}
                disabled={currentValue <= min}
                onPress={decrement}
                activeOpacity={0.8}
            >
                <Text style={styles.symbolWhite}>−</Text>
            </TouchableOpacity>

            {/* -------- VALUE -------- */}
            <Text style={styles.value}>{currentValue}</Text>

            {/* -------- INCREMENT (GRADIENT) -------- */}
            <TouchableOpacity
                disabled={currentValue >= max}
                onPress={increment}
                activeOpacity={0.8}
            >
                <GradientBox
                    style={[
                        styles.circleButton,
                        currentValue >= max && styles.disabled,
                    ]}
                >
                    <Text style={styles.symbolWhite}>+</Text>
                </GradientBox>
            </TouchableOpacity>
        </View>
    );
};

export default IncrementCounter;
const styles = StyleSheet.create(() => ({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    circleButton: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    decrementButton: {
        backgroundColor: '#000',
    },

    disabled: {
        opacity: 0.4,
    },

    symbolWhite: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },

    value: {
        minWidth: 30,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
    },
}));
