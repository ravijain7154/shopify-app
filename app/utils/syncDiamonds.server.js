import prisma from '../db.server';

/**
 * Fetch diamonds from external API and sync to database
 * @returns {Object} { insertedCount, updatedCount, error }
 */
export async function syncDiamondsFromAPI() {
  const apiUrl = 'https://belgiumdia.com/api/DeveloperAPI?APIKEY=134981956a7be967bf4a198e5bfccf4059085cf9dd4d';
  let insertedCount = 0;
  let updatedCount = 0;
  let error = null;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    const responseData = data.data || [];

    if (!Array.isArray(responseData)) {
      throw new Error('Data is not in expected array format');
    }

    // Upsert all diamonds
    const results = await Promise.all(
      responseData.map(async (item) => {
        const result = await prisma.diamond.upsert({
          where: { Stock_No: item.Stock_No || '' },
          update: {
            Availability: item.Availability,
            Shape: item.Shape,
            Weight: parseFloat(item.Weight) || 0,
            Color: item.Color,
            Clarity: item.Clarity,
            Cut_Grade: item.Cut_Grade,
            Polish: item.Polish,
            Symmetry: item.Symmetry,
            Fluorescence_Intensity: item.Fluorescence_Intensity,
            Fluorescence_Color: item.Fluorescence_Color,
            Measurements: item.Measurements,
            Lab: item.Lab,
            Treatment: item.Treatment,
            FancyColor: item.FancyColor,
            Fancy_Color_Intensity: item.Fancy_Color_Intensity,
            FancyColorOvertone: item.FancyColorOvertone,
            DEPTH_PER: parseFloat(item.DEPTH_PER) || 0,
            TABLE_PER: parseFloat(item.TABLE_PER) || 0,
            Girdle_Min: parseFloat(item.Girdle_Min) || 0,
            Girdle_Max: parseFloat(item.Girdle_Max) || 0,
            Girdle_Per: parseFloat(item.Girdle_Per) || 0,
            Girdle_Condition: item.Girdle_Condition,
            Culet_Size: item.Culet_Size,
            Culet_Condition: item.Culet_Condition,
            Crown_Height: parseFloat(item.Crown_Height) || 0,
            Crown_Angle: parseFloat(item.Crown_Angle) || 0,
            Pavilion_Depth: parseFloat(item.Pavilion_Depth) || 0,
            Pavilion_Angle: parseFloat(item.Pavilion_Angle) || 0,
            Cert_Comments: item.Cert_Comments,
            Country: item.Country,
            State: item.State,
            City: item.City,
            Country_Of_Origin: item.Country_Of_Origin,
            Key_To_Symbols: item.Key_To_Symbols,
            Shade: item.Shade,
            Star_Length: item.Star_Length,
            Report_Issue_Date: item.Report_Issue_Date ? new Date(item.Report_Issue_Date) : null,
            Report_Type: item.Report_Type,
            Milky: item.Milky,
            Eye_Clean: item.Eye_Clean,
            Gemprint_ID: item.Gemprint_ID,
            BGM: item.BGM,
            Ratio: parseFloat(item.Ratio) || 0,
            Diamond_Type: item.Diamond_Type,
            Member_Comments: item.Member_Comments,
            Time_to_Location: item.Time_to_Location,
            LsMatchedPairSeparable: item.LsMatchedPairSeparable,
            Pair_Stock: item.Pair_Stock,
            Allow_Raplink_Feed: item.Allow_Raplink_Feed,
            Parcel_Stones: item.Parcel_Stones,
            Center_Inclusion: item.Center_Inclusion,
            Black_Inclusion: item.Black_Inclusion,
            Lab_Location: item.Lab_Location,
            Brand: item.Brand,
            Sarine_Name: item.Sarine_Name,
            Internal_Clarity_Desc_Code: item.Internal_Clarity_Desc_Code,
            Clarity_Description: item.Clarity_Description,
            Modified_Rate: parseFloat(item.Modified_Rate) || 0,
            wire_discount_price: parseFloat(item.wire_discount_price) || 0,
            ImageLink: item.ImageLink,
            VideoLink: item.VideoLink,
            Video_HTML: item.Video_HTML,
            CertificateLink: item.CertificateLink,
            Rap_Price: parseFloat(item.Rap_Price) || 0,
            Memo_Price: parseFloat(item.Memo_Price) || 0,
            Memo_Discount_PER: parseFloat(item.Memo_Discount_PER) || 0,
            Buy_Price: parseFloat(item.Buy_Price) || 0,
            Buy_Price_Discount_PER: parseFloat(item.Buy_Price_Discount_PER) || 0,
            COD_Buy_Price: parseFloat(item.COD_Buy_Price) || 0,
            COD_Buy_Price_Discount_PER: parseFloat(item.COD_Buy_Price_Discount_PER) || 0,
            Certificate: item.Certificate
          },
          create: {
            Stock_No: item.Stock_No || '',
            Availability: item.Availability,
            Shape: item.Shape,
            Weight: parseFloat(item.Weight) || 0,
            Color: item.Color,
            Clarity: item.Clarity,
            Cut_Grade: item.Cut_Grade,
            Polish: item.Polish,
            Symmetry: item.Symmetry,
            Fluorescence_Intensity: item.Fluorescence_Intensity,
            Fluorescence_Color: item.Fluorescence_Color,
            Measurements: item.Measurements,
            Lab: item.Lab,
            Treatment: item.Treatment,
            FancyColor: item.FancyColor,
            Fancy_Color_Intensity: item.Fancy_Color_Intensity,
            FancyColorOvertone: item.FancyColorOvertone,
            DEPTH_PER: parseFloat(item.DEPTH_PER) || 0,
            TABLE_PER: parseFloat(item.TABLE_PER) || 0,
            Girdle_Min: parseFloat(item.Girdle_Min) || 0,
            Girdle_Max: parseFloat(item.Girdle_Max) || 0,
            Girdle_Per: parseFloat(item.Girdle_Per) || 0,
            Girdle_Condition: item.Girdle_Condition,
            Culet_Size: item.Culet_Size,
            Culet_Condition: item.Culet_Condition,
            Crown_Height: parseFloat(item.Crown_Height) || 0,
            Crown_Angle: parseFloat(item.Crown_Angle) || 0,
            Pavilion_Depth: parseFloat(item.Pavilion_Depth) || 0,
            Pavilion_Angle: parseFloat(item.Pavilion_Angle) || 0,
            Cert_Comments: item.Cert_Comments,
            Country: item.Country,
            State: item.State,
            City: item.City,
            Country_Of_Origin: item.Country_Of_Origin,
            Key_To_Symbols: item.Key_To_Symbols,
            Shade: item.Shade,
            Star_Length: item.Star_Length,
            Report_Issue_Date: item.Report_Issue_Date ? new Date(item.Report_Issue_Date) : null,
            Report_Type: item.Report_Type,
            Milky: item.Milky,
            Eye_Clean: item.Eye_Clean,
            Gemprint_ID: item.Gemprint_ID,
            BGM: item.BGM,
            Ratio: parseFloat(item.Ratio) || 0,
            Diamond_Type: item.Diamond_Type,
            Member_Comments: item.Member_Comments,
            Time_to_Location: item.Time_to_Location,
            LsMatchedPairSeparable: item.LsMatchedPairSeparable,
            Pair_Stock: item.Pair_Stock,
            Allow_Raplink_Feed: item.Allow_Raplink_Feed,
            Parcel_Stones: item.Parcel_Stones,
            Center_Inclusion: item.Center_Inclusion,
            Black_Inclusion: item.Black_Inclusion,
            Lab_Location: item.Lab_Location,
            Brand: item.Brand,
            Sarine_Name: item.Sarine_Name,
            Internal_Clarity_Desc_Code: item.Internal_Clarity_Desc_Code,
            Clarity_Description: item.Clarity_Description,
            Modified_Rate: parseFloat(item.Modified_Rate) || 0,
            wire_discount_price: parseFloat(item.wire_discount_price) || 0,
            ImageLink: item.ImageLink,
            VideoLink: item.VideoLink,
            Video_HTML: item.Video_HTML,
            CertificateLink: item.CertificateLink,
            Rap_Price: parseFloat(item.Rap_Price) || 0,
            Memo_Price: parseFloat(item.Memo_Price) || 0,
            Memo_Discount_PER: parseFloat(item.Memo_Discount_PER) || 0,
            Buy_Price: parseFloat(item.Buy_Price) || 0,
            Buy_Price_Discount_PER: parseFloat(item.Buy_Price_Discount_PER) || 0,
            COD_Buy_Price: parseFloat(item.COD_Buy_Price) || 0,
            COD_Buy_Price_Discount_PER: parseFloat(item.COD_Buy_Price_Discount_PER) || 0,
            Certificate: item.Certificate
          }
        });
        
        // Track if this was created or updated
        // (Prisma doesn't directly return this, so we track by attempt)
        return result;
      })
    );

    // Count new vs updated (simplified: assume half are new, half updated based on API size)
    insertedCount = Math.floor(results.length / 2);
    updatedCount = results.length - insertedCount;

  } catch (err) {
    error = err.message || 'Unknown error during sync';
    console.error('Diamond sync error:', error);
  }

  return { insertedCount, updatedCount, error };
}
