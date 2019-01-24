<?php
require('fpdf/config/dbconfig.php');
require('fpdf/fpdf.php');

class PDF extends FPDF
{
	function Header()
	{
		global $title;

		// Arial bold 15
		$this->SetFont('Arial','B',15);
		
		// Calculamos ancho y posición del título.
		$w = $this->GetStringWidth($title)+6;
		$this->SetX((210-$w)/2);
		
		// Colores de los bordes, fondo y texto
		$this->SetDrawColor(0,80,180);
		$this->SetFillColor(230,230,0);
		$this->SetTextColor(220,50,50);
		
		// Ancho del borde (1 mm)
		$this->SetLineWidth(1);
		
		// Título
		# $this->Cell($w,9,$title,1,1,'C',true);
		# $this->Ln(10);
		
		$this->Cell(40,20);
		// $this->Image('fpdf/monteverde/images/logo.png', 80, 22, 10,10,'PNG');
		$this->Image('fpdf/monteverde/images/logo.png', 140, 10, 50, 'PNG');

		
		$this->Ln(25);
		
		#$this->Cell(40,20);
		#$this->Write(5,'A continuación mostramos una imagen ');
		#$this->Image('fpdf/monteverde/images/logo.png' , 80 ,22, 35 , 38,'png', 'http://www.desarrolloweb.com');
	}

	function Footer()
	{
		// Posición a 1,5 cm del final
		$this->SetY(-25);
		
		// Arial itálica 8
		$this->SetFont('Arial','I',9);
		// Color del texto en gris
		$this->SetTextColor(128);
		// Número de página
		$this->Cell(0,10,'SERVICIOS AMBIENTALES Y FORESTALES MONTEVERDE LTDA. / NIT: 811042791-1',0,0,'C');
		$this->Ln(4);
		$this->Cell(0,10,'Telefono(s): 413 90 26 / Email: atencionalcliente@monteverdeltda.com',0,0,'C');
		$this->Ln(4);
		$this->Cell(0,10,'Página '.$this->PageNo(),0,0,'C');
		$this->Ln(4);
	}

	function ChapterTitle($num, $label)
	{
		// Arial 12
		$this->SetFont('Arial','',12);
		
		// Color de fondo
		$this->SetFillColor(200,220,255);
		
		// Título
		$this->Cell(0,6,"Capítulo $num : $label",0,1,'L',true);
		
		// Salto de línea
		$this->Ln(4);
	}

	function ChapterBody($file)
	{
		// Leemos el fichero
		$txt = file_get_contents($file);
		
		// Times 12
		$this->SetFont('Times','',12);
		
		// Imprimimos el texto justificado
		$this->MultiCell(0,5,$txt);
		
		// Salto de línea
		$this->Ln();
		
		// Cita en itálica
		$this->SetFont('','I');
		$this->Cell(0,5,'(fin del extracto)');
	}

	function PrintChapter($num, $title, $file)
	{
		$this->AddPage();
		$this->ChapterTitle($num,$title);
		$this->ChapterBody($file);
	}

	function PrintChapterNoTitle($file)
	{
		$this->ChapterBody($file);
	}

// Cargar los datos
function LoadDataFile($file)
{
    // Leer las líneas del fichero
    $lines = file($file);
    $data = array();
    foreach($lines as $line)
        $data[] = explode(';',trim($line));
    return $data;
}

// Tabla simple
function BasicTable($header, $data)
{
    // Cabecera
    foreach($header as $col)
        $this->Cell(40,7,$col,1);
    $this->Ln();
    // Datos
    foreach($data as $row)
    {
        foreach($row as $col)
            $this->Cell(40,6,$col,1);
        $this->Ln();
    }
}

// Una tabla más completa
function ImprovedTable($header, $data)
{
    // Anchuras de las columnas
    $w = array(40, 35, 45, 40);
    // Cabeceras
    for($i=0;$i<count($header);$i++)
        $this->Cell($w[$i],7,$header[$i],1,0,'C');
    $this->Ln();
    // Datos
    foreach($data as $row)
    {
        $this->Cell($w[0],6,$row[0],'LR');
        $this->Cell($w[1],6,$row[1],'LR');
        $this->Cell($w[2],6,number_format($row[2]),'LR',0,'R');
        $this->Cell($w[3],6,number_format($row[3]),'LR',0,'R');
        $this->Ln();
    }
    // Línea de cierre
    $this->Cell(array_sum($w),0,'','T');
}

// Tabla coloreada
function FancyTable($header, $data)
{
    // Colores, ancho de línea y fuente en negrita
    $this->SetFillColor(255,0,0);
    $this->SetTextColor(255);
    $this->SetDrawColor(128,0,0);
    $this->SetLineWidth(.3);
    $this->SetFont('','B');
    // Cabecera
    $w = array(20, 18, 23, 20, 20, 20);
    for($i=0;$i<count($header);$i++)
        $this->Cell($w[$i],7,$header[$i],1,0,'C',true);
    $this->Ln();
    // Restauración de colores y fuentes
    $this->SetFillColor(224,235,255);
    $this->SetTextColor(0);
    $this->SetFont('');
    // Datos
    $fill = false;
    foreach($data as $row)
    {
        $this->Cell($w[0],6,$row[0],'LR',0,'L',$fill);
        $this->Cell($w[1],6,$row[1],'LR',0,'L',$fill);
        $this->Cell($w[2],6,number_format($row[2]),'LR',0,'R',$fill);
        $this->Cell($w[3],6,number_format($row[3]),'LR',0,'R',$fill);
        $this->Ln();
        $fill = !$fill;
    }
    // Línea de cierre
    $this->Cell(array_sum($w),0,'','T');
}
}


function generateQuotationPDF($infoData){
}

if(isset($_GET['refQuotations']))
{
	$idQuotations = (int) $_GET['refQuotations'];
	
	try {
		$sql = "SELECT 
			quotations_clients.id AS quotations_id
			, clients.social_reason AS client_full_name
			, geo_departments.name AS department
			, geo_citys.name AS city 
			, quotations_clients.id AS quotation_number
			, accounts_clients.name AS proyect_name
			, accounts_clients.create AS account_create
			, accounts_clients.update AS account_update
			, quotations_clients.create AS quotations_clients_create
			, quotations_clients.update AS quotations_clients_update 
			, quotations_clients.values AS listvalues
			
			FROM quotations_clients 
			LEFT JOIN accounts_clients 
				ON quotations_clients.account = accounts_clients.id 
			LEFT JOIN clients 
				ON quotations_clients.client = clients.id 
			LEFT JOIN geo_departments
				ON clients.department = geo_departments.id 
			LEFT JOIN geo_citys
				ON clients.city = geo_citys.id 
			WHERE quotations_clients.id='{$idQuotations}' ;";
			
			
		$conn = new PDO("mysql:host=" . HOST_DB . ";port=8889;dbname=" . NAME_DB, USER_DB, PASS_DB); 
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$conn->exec("SET CHARACTER SET utf8; SET COLLATION SET utf8_unicode_ci");
		$stmt = $conn->prepare($sql); 
		$stmt->execute();

		$result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
		$result = new RecursiveArrayIterator($stmt->fetchAll());
		
		if(isset($result[0]['quotations_id'])){
			$infoData = $result[0];
			$infoData['listvalues'] = @json_decode($infoData['listvalues']);
			#$fgsta = json_decode($infoData['listvalues'], JSON_HEX_QUOT);
		
			$label_services = array();
			foreach($infoData['listvalues']->services as $service){
				$label_services[] = utf8_decode($service->service->name);
			}
			
			#echo json_encode($infoData);
			# Crear PDF
			#$pdf = new PDF();
			$pdf = new PDF('P','mm','A4');
			$title = 'Monteverde LTDA - Servicios Ambientales Y Forestales';
			$pdf->SetTitle($title);
			$pdf->SetAuthor('Creado por CMR - Monteverde LTDA');

			# Pagina 1
			$pdf->AddPage();
			$pdf->SetFont('Arial', '', 10);
			# Pagina # 1 ---------------------------- CARTA DE SALUDO
			$datetime = new DateTime($infoData['quotations_clients_create']);
			$QC_years_total = TOTAL_YEARS;
			$QC_create_day = $datetime->format('d');
			$QC_create_month = $datetime->format('F');
			$QC_create_month_spanish = str_ireplace($nmeng, $nmtur, $QC_create_month);
			$QC_create_year = $datetime->format('Y');
			$QC_FullName = utf8_decode($infoData['client_full_name']);
			$QC_Department = utf8_decode($infoData['department']);
			$QC_City = utf8_decode($infoData['city']);
			#$QC_NumberRef = $infoData['quotations_id'];
			$QC_NumberRef = str_pad($infoData['quotations_id'], 11, "0", STR_PAD_LEFT);
			$QC_ProyectName = utf8_decode($infoData['proyect_name']);
			$QC_LabelsServices = (@implode(', ', $label_services));
			
			$pdf->Cell(0, 15, "Medellin, {$QC_create_day} de {$QC_create_month_spanish} de {$QC_create_year} ");
			$pdf->Ln();
			$pdf->Ln();
			$pdf->Cell(0, 10, 'Señor(a):');
			$pdf->Ln();
			$pdf->Cell(0, 7, "{$QC_FullName}");
			$pdf->Ln();
			$pdf->Cell(0, 7, "{$QC_City}, {$QC_Department}");
			$pdf->Ln();
			$pdf->Ln();
			$pdf->MultiCell(0, 7, "Asunto: Cotización {$QC_NumberRef} - {$QC_ProyectName}.");
			$pdf->Ln();
			$pdf->Ln();
			$pdf->Cell(0, 7, 'Cordial saludo,');
			$pdf->Ln();
			$pdf->Ln();
			$pdf->MultiCell(0, 7, "Nos permitimos dar respuesta a la solicitud para el proyecto {$QC_ProyectName}, registrado bajo el numero {$QC_NumberRef}.");
			$pdf->MultiCell(0, 7, "En Monteverde, contamos con la experiencia certificada de más de {$QC_years_total} años en servicios de {$QC_LabelsServices}, con infraestructura y equipo humano altamente capacitados para apoyar la gestión de proyectos ambientales y forestales. Nuestro compromiso es dar cumplimiento a la ley, aportar valor estético y generar conciencia en el cuidado de nuestros recursos naturales, teniendo en cuenta por encima de todo la seguridad tanto de nuestro personal, nuestros clientes y la comunidad en general.");
			$pdf->Ln();
			$pdf->MultiCell(0, 7, 'Agradeciendo su interés y con el fin de entablar relaciones comerciales de mutuo beneficio.');
			$pdf->Ln();
			$pdf->Ln();
			$pdf->MultiCell(0, 7, 'Cordialmente,');
			$pdf->Ln();
			$pdf->Ln();
			$pdf->Ln();
			$pdf->MultiCell(0, 7, '__________________________________');
			$pdf->MultiCell(0, 5, 'Liz Maryori Trejos');
			$pdf->SetFont('Arial', '', 10);
			$pdf->MultiCell(0, 5, 'Analista Comercial');
			$pdf->MultiCell(0, 5, 'Servicios Ambientales y Forestales Monteverde LTDA');
			
			
			# Pagina 2
		
			// Títulos de las columnas
			$header = array('SERVICIO', 'CANT', 'U. MED', 'PRECIO', 'FREC', 'IVA', 'TOTAL');
			// Carga de datos
			$data = $pdf->LoadDataFile('fpdf/tutorial/paises.txt');
			$pdf->AddPage();
			$pdf->Ln(10);
			
			// Arial bold 15
			$pdf->SetFont('Arial','B',15);
			// Colores de los bordes, fondo y texto
			$pdf->SetFillColor(50,150,0);
			$pdf->SetTextColor(255);
			$pdf->SetDrawColor(0,150,0);
			// Ancho del borde (1 mm)
			$pdf->SetLineWidth(1);
			
			// Título
			$pdf->Cell(0,9,'DETALLE DE LA PROPUESTA',1,1,'C',true);
			$pdf->Ln(10);
			
			// Colores, ancho de línea y fuente en negrita
			$pdf->SetFillColor(50,150,0);
			$pdf->SetTextColor(255);
			$pdf->SetDrawColor(0,150,0);
			$pdf->SetLineWidth(.3);
			$pdf->SetFont('','B');
			
			$pdf->SetFont('Arial','',10);
			// Cabecera
			$w = array(45, 15, 15, 25, 45, 10, 35);
			$wTotal = 0;
			for($i=0;$i<count($header);$i++){
				$pdf->Cell($w[$i],10,$header[$i],1,0,'C',true);
				$wTotal = $wTotal + $w[$i];
			}
				
			$pdf->Ln();
			// Restauración de colores y fuentes
			$pdf->SetFillColor(224,235,255);
			$pdf->SetTextColor(0);
			$pdf->SetFont('');
			$pdf->SetFont('Arial','',8);
			$pdf->SetLineWidth(0.3);
			
			
			$TotalQou = 0;
			// Servicios
			$fill = false;
			foreach($infoData['listvalues']->services as $row)
			{
				$total = ($row->service->price * $row->quantity) + (($row->service->price * $row->quantity) * ($row->iva / 100));
				$pdf->Cell($w[0],6,utf8_decode($row->service->name),'LR', 0,'L',$fill);
				$pdf->Cell($w[1],6,$row->quantity,'LR',0,'C',$fill);
				$pdf->Cell($w[2],6,$row->service->type_medition->code,'LR',0,'C',$fill);
				$pdf->Cell($w[3],6,money_format("%.2n", $row->service->price),'LR',0,'R',$fill);
				$pdf->Cell($w[4],6,$row->repeat->name,'LR',0,'C',$fill);
				$pdf->Cell($w[5],6,$row->iva.'%','LR',0,'C',$fill);
				$pdf->Cell($w[6],6,money_format("%.2n", $total),'LR',0,'R',$fill);
				$pdf->Ln();
				$pdf->MultiCell($wTotal,6,utf8_decode($row->service->description),1,'L',$fill);
				$fill = !$fill;
				$TotalQou = $TotalQou + $total;
			}
			// Otros
			foreach($infoData['listvalues']->attributes as $row)
			{
				$total = ($row->attribute->price * $row->quantity) + (($row->attribute->price * $row->quantity) * ($row->iva / 100));
				$pdf->Cell(($w[0] + $w[1] + $w[2]),6,utf8_decode($row->attribute->name),'LR', 0,'L',$fill);
				$pdf->Cell($w[3],6,$row->quantity,'LR',0,'C',$fill);
				$pdf->Cell($w[4],6,money_format("%.2n", $row->attribute->price),'LR',0,'R',$fill);
				$pdf->Cell($w[5],6,$row->iva.'%','LR',0,'C',$fill);
				$pdf->Cell($w[6],6,money_format("%.2n", $total),'LR',0,'R',$fill);
				$pdf->Ln();
				$pdf->MultiCell($wTotal,6,utf8_decode($row->attribute->description),1,'L',$fill);
				$fill = !$fill;
				$TotalQou = $TotalQou + $total;
			}
			
			
			// Línea de cierre
			$pdf->Cell(array_sum($w),0,'','T');
				$pdf->Ln(5);
			
			$pdf->MultiCell(0, 5, 'La propuesta anterior tiene vigencia por 30 días.');
			
			$pdf->Ln(5);
			
			// Arial bold 15
			$pdf->SetFont('Arial','B',15);
			// Colores de los bordes, fondo y texto
			$pdf->SetFillColor(50,150,0);
			$pdf->SetTextColor(255);
			$pdf->SetDrawColor(0,150,0);
			// Ancho del borde (1 mm)
			$pdf->SetLineWidth(1);
			// Título
			$pdf->Cell(0,9,'VALOR TOTAL DE LA PROPUESTA',1,1,'C',true);
			
			
			// Arial bold 15
			$pdf->SetFont('Arial','B',15);
			// Colores de los bordes, fondo y texto
			$pdf->SetFillColor(0,150,0);
			$pdf->SetTextColor(50,150,0);
			$pdf->SetDrawColor(50,150,0);
			$pdf->SetLineWidth(1);
			
			$pdf->Cell(0,9,money_format("%.2n",$TotalQou),1,1,'C',false);
			$pdf->Ln(10);
			
			$pdf->Output();
		}
	}
	catch(PDOException $e) {
		echo "Error: " . $e->getMessage();
	}
	$conn = null;
}
else
{
	echo 'Upss';
}
?>
