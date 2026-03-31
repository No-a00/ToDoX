import React from 'react'
import { Card } from './ui/card'
import { Circle } from 'lucide-react'

const TaskEmptyState = ({filter}) => {
  return (
    <Card
    className="p-8 text-center border-0 bg-gradient-card shadow-custom-md" >
        <div className='space-y-3'>
            <Circle className='mx-auto size-12 text-muted-foreground'/>
            <div>
                <h3 className='font-medium text-foreground '>
                    {  filter==="active"
                    ?"không có nhiệm vụ nào đang làm."
                    :filter==="completed"
                    ?"chưa có nhiệm vụ nào hoàn thành."
                    :"chưa có nhiệm vụ"}
                </h3>
                <p className='text-sm text-muted-foreground'>
                        {
                            filter=="all"
                            ? "thêm nhiệm vụ đầu tiên vào để bắt đầu!"
                            :`chuyển sang tắt cả để thấy những nhiệm vụ ${
                                filter==="active"?"dã hoàn thành":"đang làm"
                            }`
                        }
                </p>
            </div>
        </div>

    </Card>
  )
}

export default TaskEmptyState