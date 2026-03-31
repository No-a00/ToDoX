import React from 'react'

const Footer = ({completetaskCount = 0,activetaskCount=0}) => {
  return<>
  { completetaskCount+activetaskCount>0 &&(
    <div className='text-center'>
      <p className='text-sm text-muted-foreground'>
        {
          completetaskCount>0&&(
            <>
            tuyệt vời bạn đã hoàn thành {completetaskCount} việc {
              activetaskCount>0&&`,còn ${activetaskCount} việc nữa thôi. Cố lên!`
            }
            </>
          )
        }
        {
          completetaskCount===0&&activetaskCount>0 &&(
            <>
            Hãy bắt đầu làm {activetaskCount} nhiệm vụ thôi nào!
            </>
          )
        }

      </p>
    </div>
  )

  }
  
  </>
}

export default Footer