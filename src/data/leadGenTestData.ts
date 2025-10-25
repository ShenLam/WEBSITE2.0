export const leadGenTestData = {
    fullName: 'Nguyễn Văn Automation',
    email: 'automationtest@gm.co',
    oldNID: '025912345',
    failedQualification: {
        nid: '022085003199',
        phone: '0938346433'
    },
    notifyXSTU: {
        nid: '079070746915',
        phone: '0862051677'
    },
    nidSmallThan18: '079208000999', // Dưới 18 tuổi – sinh năm 2008
    nidBiggerThan60: '001159000999', // Trên 60 tuổi – sinh năm 1959
    goodBrand: {
        cdl: 'iPhone 19 pro max',
        twl: {
            honda: 'Honda',
            yamaha: 'Yamaha',
            sym: 'SYM',
        }
    },
    location: {
        provinceCode: '125', // Thành phố Hồ Chí Minh
        districtCode: '1400', //Quận 1
    },
    message: {
        successTitle: 'Đăng ký thành công!',
        failureTitle: 'Đăng ký không thành công!',
        step1: {
            successDesc: 'Xin chân thành cảm ơn quý khách đã tin tưởng và lựa chọn dịch vụ của FE CREDIT.',
            successDesc_1: 'Thông tin của quý khách đã được ghi nhận. Để phục vụ quý khách tốt hơn, rất mong nhận được thêm thông tin chi tiết.',
            failureDesc: 'Bạn không thỏa điều kiện nhận khoản vay từ FE CREDIT',
            failureDesc_1: 'Thông tin đăng ký của bạn đã được chúng tôi ghi nhận trước đó, xin vui lòng thử lại sau'
        },
        step2: {
            successDesc: 'Tư vấn viên sẽ liên hệ tới quý khách trong thời gian sớm nhất',
            successDesc_1: 'Chúng tôi đã ghi nhận thông tin đăng ký của quý khách và sẽ liên hệ lại sau. Cảm ơn',
        }
    }
};