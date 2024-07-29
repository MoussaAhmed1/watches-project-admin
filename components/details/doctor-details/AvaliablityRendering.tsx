'use client';
import React from 'react';
import { Avaliablity } from '@/types/doctors';
import CustomTimePicker from "@/components/shared/timepicker/TimePicker";
import { Calendar } from 'lucide-react';
import { workingTimeCards } from '@/components/forms/users-forms/doctor-form/add-doctor';

interface IProps {
    availibilty: Avaliablity[];
}

const AvaliablityRendering = ({ availibilty }: IProps) => {
    return (
        <div style={{ minHeight: 500, display: 'flex', flexDirection: "column", justifyContent: "space-between" }} className='p-2'>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', width: "97%", justifyContent: "start", flexDirection: "column" }}>
                {
                    workingTimeCards?.filter((day, ind) => {
                        if (availibilty[ind]?.is_active) {
                            return day;
                        }
                    }).map((availbleday: { id: string, name: string }, ind: number) => {
                        return (
                            <div className="flex space-x-10 items-center  pb-2" key={availbleday?.id}>
                                {/* TimePicker */}
                                <div className='flex min-w-[110px] mt-4 gap-1'>
                                    <Calendar />
                                    <span className='font-medium'>{availbleday?.name}</span>
                                </div>
                                {<div className="flex space-x-5">
                                    <div>
                                        <span className="max-w-30 mx-1">Start Time</span>
                                        <CustomTimePicker
                                            val={availibilty[ind].start_at}
                                            _disabled
                                        />
                                    </div>
                                    <div>
                                        <span className="max-w-30 mx-1">End Time</span>
                                        <CustomTimePicker
                                            val={availibilty[ind].end_at}
                                            _disabled
                                        />
                                    </div>
                                </div>}
                            </div>
                        )
                    })
                }

            </div>
        </div>
    );
};

export default AvaliablityRendering;