const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const fifa2014=fifaData.find((mac)=>mac.Year===2014&&mac["Stage"]==="Final")
console.log(fifa2014["Home Team Name"])
//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
console.log(fifa2014["Away Team Name"])
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
console.log(fifa2014["Home Team Goals"])
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
console.log(fifa2014["Away Team Goals"])
//(e) 2014 Dünya kupası finali kazananı*/
function thewinner(themac){
	if(themac["Home Team Goals"]>themac["Away Team Goals"])
	{return themac["Home Team Goals"]}
	else if (themac["Home Team Goals"]<themac["Away Team Goals"])
	{return themac["Away Team Goals"]}
	
}
console.log(thewinner(fifa2014))

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(dataset) {
	
  const finals=dataset.filter(last=>last.Stage==="Final");
  return finals
}
console.log(Finaller(fifaData))


/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(dataSeti,callback) {
	
    return callback(dataSeti).map((f)=>f.Year);
}

console.log(Yillar(fifaData,Finaller))
/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(datam,callback) {
const magic=callback(datam);
const winners=[];
for (let i=0;i<callback(datam).length;i++){
if(magic[i]["Home Team Goals"]>magic[i]["Away Team Goals"]){winners.push(magic[i]["Home Team Name"]);
}else if(magic[i]["Home Team Goals"]<magic[i]["Away Team Goals"]){winners.push(magic[i]["Away Team Name"]);
}else{
		if(magic[i]["Win conditions"].includes(magic[i]["Home Team Name"]))
		{winners.push(magic[i]["Home Team Name"]);
	}else{winners.push(magic[i]["Away Team Name"]);}
}
}
return winners;
}
console.log(Kazananlar(fifaData,Finaller))
/*
	
	const kazananlar=function()
	 {callback(datam).map((w)=>(w.["Home Team Goals"]>w.["Away Team Goals"])? callback(datam)[i]["Home Team Name"]: callback(datam)[i]["Away Team Name"])}
}
    
	


console.log(Kazananlar(fifaData,Finaller))


/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(futdata,finallercallback,yıllarcallback,kazananlarcallback) {
const finallist=finallercallback(futdata);
const yearlist=yıllarcallback(finallist,finallercallback);	
const kazananlist=kazananlarcallback(yearlist,finallercallback);
const result=yearlist.map((year,index)=>{
	return `${year} yılında, ${kazananlist[index]} dünya kupasını kazandı!`;
});
return result;
}
const yilindaKazananlarArray = YillaraGoreKazananlar(
	fifaData,
	Finaller,
	Yillar,
	Kazananlar
  );
  console.log(YillaraGoreKazananlar);

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(callback) {
const macortalaması=callback.map((w)=>({
golsayısı: w["Home Team Goals"] + w["Away Team Goals"]
}));
	console.log(macortalaması);
	const toplamgol=macortalaması.reduce((toplam,val)=>{
		return toplam+val.golsayısı;
	},0);
	console.log(toplamgol);
	return (toplamgol/macortalaması.length).toFixed(2)
}
console.log(OrtalamaGolSayisi(Finaller(fifaData)))



/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
