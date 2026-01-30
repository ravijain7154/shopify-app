import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function syncDiamonds() {
  try {
    console.log("🔄 Starting diamond sync...\n");
    
    // Step 1: Fetch from Belgium API
    const apiUrl = 'https://belgiumdia.com/api/DeveloperAPI?APIKEY=134981956a7be967bf4a198e5bfccf4059085cf9dd4d';
    const LIMIT = 1000; // Limit to 100 records for free tier database
    
    console.log("📡 Fetching from Belgium API...");
    console.log("URL:", apiUrl);
    
    const response = await fetch(apiUrl);
    console.log("✅ API Response Status:", response.status);

    if (!response.ok) {
      throw new Error(`API failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("📋 API Response Sample:", JSON.stringify(data, null, 2).substring(0, 500));
    let diamonds = data.Stock || [];
    console.log(`✅ Received ${diamonds.length} diamonds from API`);
    
    // Limit to prevent database overflow
    diamonds = diamonds.slice(0, LIMIT);
    console.log(`⚙️  Limited to ${diamonds.length} records for processing\n`);

    if (!Array.isArray(diamonds) || diamonds.length === 0) {
      console.log("❌ No diamonds data received");
      process.exit(0);
    }

    // Step 2: Store in database
    console.log("💾 Starting database sync...");
    let insertedCount = 0;
    let updatedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < diamonds.length; i++) {
      const item = diamonds[i];
      
      try {
        // Check if record exists
        const existingRecord = await prisma.diamond.findUnique({
          where: { Stock_No: item.Stock_No || '' }
        });
        
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

        // Track if it was an insert or update
        if (existingRecord) {
          updatedCount++;
        } else {
          insertedCount++;
        }
        
        // Progress indicator
        if ((i + 1) % 10 === 0) {
          console.log(`   ⏳ Processed ${i + 1}/${diamonds.length} records (Inserted: ${insertedCount}, Updated: ${updatedCount})...`);
        }
      } catch (itemError) {
        console.log(`   ❌ Error at record ${i + 1} (${item.Stock_No}): ${itemError.message}`);
        errorCount++;
      }
    }

    console.log("\n✅ Sync Complete!");
    console.log(`📊 Total Records Processed: ${diamonds.length}`);
    console.log(`✨ Newly Inserted: ${insertedCount}`);
    console.log(`🔄 Updated: ${updatedCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`⏱️  Timestamp: ${new Date().toISOString()}\n`);

    process.exit(0);

  } catch (error) {
    console.error("\n❌ Fatal Error:", error.message);
    console.error("Stack:", error.stack);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the sync
syncDiamonds();
