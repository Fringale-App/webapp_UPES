import React, { useState,useEffect } from 'react';
import popup from '../../Images/popup.png'

function PopUp({ isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
          const timer = setTimeout(() => {
            onClose();
          }, 2000); // Close after 4 seconds
    
          return () => clearTimeout(timer); // Clear the timeout if the component unmounts
        }
      }, [isOpen, onClose]);
    return (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
            isOpen ? 'visible' : 'invisible'
          } transition-opacity duration-300`}
          onClick={onClose}
        >
          <div
            className={`absolute top-1/2 flex flex-col items-center justify-center left-1/2 w-60 h-60 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-lg shadow-lg ${
              isOpen ? 'scale-100' : 'scale-0'
            } transition-transform duration-500 ease-in-out`}
            onClick={(e) => e.stopPropagation()} // Prevent click event from closing the popup
          >
            <img className='w-32 h-32 mb-4' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAk1BMVEX0Qzb////zMyL0PS/0QTT4kIr4jYf0Nib0Oyz0Oy3zMR/zMyP4kYv0OCn929n0PzL/+Pf1VUr2b2b6sKz0Rzr7wr/1XlT4ioT+7u3zLRr6trL1Sz71Zl33e3P80M33hn/8ycb93935nZf3dm3+5+X4mJP81dL6tLD1WU71TkP5p6L2Ylj7vbnzJAv2cWj3gnv5o54zq5G3AAALFklEQVR4nO2d2WKjOgyGA3gCmCFkT2hWsrRJk5n2/Z/uwORAWAzYyGJp+9+cm9MpX2VbsizLPeWrq9f0B6Drh7D7+iHsvn4IZWj5Onv73B3Xl1VPM3Rbc1aj23F3mNxflzX8dlTCpXc/bC62Sy3dNjXHIaEcRzNt3VJda7Q5v3iooGiE3v3XukcDi5FevojjW5X2brsXD+tDUAhPL5uVbRmFbElOU7dXx5cTxsdIJxxuz1dX1wgvXURJNN2dnrdD2R8kl3C47U+p4QjCxTANShZ7uZAyCQf9q2qI2i4DaVrX3avEr5JGOJxcdTBeaElrNJFmSEmEgwXVqw/OrByd7gZyPk0K4X4MH51pEZOO9zI+TgLhfW5pkvEe0qzLSwsIZ1dV5vBMyrGms4YJ9xeKxxeI0DmQEUQ4GCPzBXLoGLTmAAiHO6T5l5am7wC+ozrhxJW+fuaJGO6kdsLBWq2L7x+juq46VCsSnu16BuhTmn2okdAb6XUa8CGij7y6CN9rWEFZcuh7LYTLca0zMC5Cj+IJD2HC7dRsiC+Q2dtiEx7cpgz4EHE/UQmHG7VRvkD0Q8z9CxGe5nbTfL7sudBkFCEcmHU7QbY04uEQzmizU/AphwrsjfkJJ1ZbAP31xuKPU7kJPxvzgiwRlXtJ5SX83Zoh+hChvGEqJ+Hv5r1EWupZJuFvq2kehjgRuQhbaMFAKtdA5SE80KZZckR5lhsOwkmrVtG4iMrhNMoJ7y3yg2kRq9z1lxIOWuYmkiLUgxKetDYD+gGcUxaGlxAOL+0ItvOlzUs2UyWEmzZsl4plf0AID+10hEmV5KcKCfdu01/PJbcwd1NEuOy1e5UJ5UyLVpsiwnGTWTURGcdqhJ9dmIQP0YLYJp+w3a4+KaJ6FQhHzaTuq8kZiROe9aa/Wkh67k4qj3DQwOkSRMT2BAnXbY/W0tLWYoST7qyjofL2imzCZcPnL1VEXHYIzibcGU1/bwUZO37Cri0zDxGdWczAJBx3bZl5SBvzEu7bmlsrE2UViLEI512KZuJy5nyEs66akG1EBuG0i8vMQ86Kh/DexjMKXll3DsLOzsJAjJmYIdx32YS+ETNJ8AxhR31hqKxPTBN63Qu5k1LTgU2acNHFiDQuMx2dpgiHHUrOsEXosJBw0q3cBUv6pJBQQvqJONz3DjM/qpmVfzZSOimVJBxAXQUx3On6ola6ZOJQctyNVfDOzRoUEPaB64xjn/8l2PcX8TMr/fa4k/fSA/orY5FPOLzCBqkzjf58C9HRoEbftbzBEMl1mEu4hTlDYsfGxy+xf0v99fxR6ImQmjiLShACnaGRKOHpiyCq/fiPvsBWdCPxj8UJh8B9k5s85BKwYtyCgWD1LaQXH6ZxwlfY1pdMk5/Jb8WkBX2NYesBjQ/TOOEZNkidTNaZ04ppCyrKDnZymZgucULgIHUu6Q/lK4jLAipH4Goa3+rHCE/AU3uiZr6Ux4qZIeoLGtm4se4MMULgCuZ/K6MEqxSRYUFlC82F6bH7wzHCDXTvy0zmlSCyLKjcoNGxFjvYjxGuwEGvvch+bTEiy4LKAlymFJ+IT0LPhm8NmRYpcBrM/18wGmIpfl76JLzL2BqqLCvmrqhMCwrFQnmKTcQn4UJK9QzTKjmIWBb0ZT7/0k/CtZw8KT8ingX9Re+WJVzKSubzIjIB5VgwCE2jGDki9KSdx/ANPlRAPzT1MoRgf/+UxYGIOUQDPZeaiPAssVa2fKAiLjIP2VHwHRGCI5q4yhCxLehHNZsM4UXqkVOxjdAtGN/oRISSr40UuX58CwaFGWnCpeyC53w71WDBXiylEhICMxgM5VmxDgv6omFHtJBwJv9glO00/tRiQf+3h0ULISHGkQxzOLJ6WyEAPg9oQsIDxtURJmI9gL2o2UtIKGdnkRYXIgrg86Q0JPyLc3zPXG6Skr/I/FOUyAgJwamRHJVaEceCsf1TSIhWmV9iRSQLxg5KQ0J4GipPhVbEsmAsGRUSCveM5VcBIpoFg562KULM3mu5iHgWDGoCUoQSUon5ykFEtGCQUKyTsPfnjQH48gfzV0abi5AQtXY9x4aorRqIUec8ZO0msBGJkyJEvC5asJYiLjUkIvv/v4j+MM+CuFbM+EO8mKY4bEOzYpSoQY9LiyyIacWoqiAkBJ6c54lj+4SEmNlbIO0PyyyIN1Az+0OcPT4PINYeP+zOg5qnYQHWlqcJwyjEXBs7bcjMtSHMxUyuDSFfmpM2FDklBiiTL5Wf885N/NaDmMl5yw69i1L3daT1o80T2tlTYeqenfCXOk8YZ0/454cxK/GcEsPEOD+UegZceviCPhef/c0jQikFQw/xzDNsRD26iIhRi8FVZYGMyKjFkFdPw1lGwpyLshDJNFtPg1oTxVxEMK0Yq8h+EkLvyzwkcsJrCZX5CSl2ISFWmygjMhVz5niuP3bjWXJ9qeAZPZYV2fWlEpJRurBN2DXCYMfFrhFWNtBtfvbCRbEFAzEDOPCiZ26e/5jMWn3K6J5SqVYfvJXLqdUH37dI3woqt2Ag1nID9c059y2gE1HbZL6Ua11kuH7gNiDvzgz03pOZmVK8954yiMDMX+69J+BVlUw7A8DdNZgNc++uAe8fpu89NXf/cJp3/xAauCVvwgPukAJTm/l3SMH3gJ3YEga4B3wCXl0ruAc8vAJX01GEuBD9Yz1d/2mEd5cbvL/QyCPT/HoTH2f6+pHhfCPQ+/jJSZ3qqQANa4iu/11sppWeLXPodLP4q4PTmnpRTwUJB6VEMyu3cYf8bKTivhjK+5fvbfIF+tOoxf1pJOUyGpSRjo/ShIPuNtx7qLRP1Nfv9fUN+rV9/Z573e6bqPL0TVRW3TUiX+/Lb9C/VPJxcI3i7UHb4T7CrNefvmcv6G/Qz1v56GJ0KtKTvZNbjEzTy0LCr/82gqIAO/vVL9H3LTq32CQ6GnIRKodu5TP03EdJv/FbQd1676ngoceCN7veu7OeqgXP5xUQdufdNZMZrnEQSisEQxap/Haesv3q7x925A3Lkqediwk78Q5ptkBChHA4b3v0Bn1LtvXvARPzVEJQRthyx09YdViChMqs1e9ys154EiX8+m+r+z6jrbk3Wuwn+AmVczvdovqb5+O5CHF7A1SVxQXISdhGRD4LchMq55bNRUI5AbkJ/RC1TSsqKQlGqxAqkxblpojF4SaECZVZa6Ib4pY7+iqEykBrRxiuaaWhWkVC5XRrw2bKvpQF29UJleGmea+hbkq2SyBCRfls+C1k4nIvohUJle20yQyc2WMd88olVJZ/G/OMRP1blFWTRago75UKZOFy6Gf5x0khVLxRA96f6CMRJwEjDJq91O0atfzTJRRCZXCrdTYSa13JgABCRXlzMXu8JfkMlz8OlUeoDD/0eoaqpu/EnLwsQn+ojmtYVR06rjpA4YSKsp8jMzr0IuzjpRL6e6pVpSc5OfnUlcA+CYlQUe5zC2c+atY8WxDbBKE/VsdU+rpKDHUMHJ8PSSH0o5w+1WUOVkenC9D68pQkQt93TEa6JEM6hjWaAPxDUtIIfQ36VxUMSQzr+uu1/JdxSyahb8htf0oB/TWIQVeLvTTz/ZNcQl/D18PK1U3h/uCEaLo7PW/l4ikIhIFO94+rbRnc13mJP/OM1fFFKMPEKxTCQN69v55S3dYKOYlj2jqdrvt3D+tD0AgDLb37YTO3XWrptqk5DgnlOJpPZlFXv3wc7p54akJAqIT/a/k6ezssjuvRtWfamqaR6+V27H9OZq+oaP+rDsJm9UPYff0Qdl8/hN3XfxGMrjTKspArAAAAAElFTkSuQmCC" alt="" />
            <p className='font-bold text-sm'>Sorry, you didn't match with the key item.</p>
            
          </div>
        </div>
      );
}
export default PopUp;