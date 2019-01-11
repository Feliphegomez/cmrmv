<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'mvltda_cmr');
define('DB_USER', 'mvltda_usrcmr');
define('DB_HASH', 'B1Uvw2e2JU');

/* 
	Clase principal para Acceder a la base de datos.
*/
class ConectionDB
{
	var $error = true; // Error activo Si / No
	var $message = null; // Mensaje para el error
	var $sql = null; // Consulta vacia
	var $data = array(); // Infomacion SQL	
	
	/* Seleccionar Tabla SQL */
	function setSQL($sql=null)
	{
		$this->sql = $sql;
	}
	
	/* */
	function executeSQL()
	{
		try {
			$conn = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_HASH);
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$stmt = $conn->prepare($this->sql); 
			$stmt->execute();

			$result = $stmt->setFetchMode(PDO::FETCH_OBJ);
			#$result = $stmt->setFetchMode(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
			$DataFull = $stmt->fetchAll();
			if(count($DataFull) === 1){
				$this->dataCount = 1;
				$this->data = ($DataFull[0]);
			}else{
				$this->dataCount = count($DataFull);
				$this->data = ($DataFull);
			}
			
			$this->error = false;
			$this->message = "Consulta cargada con éxito.";
		}
		catch(PDOException $e) {
			$this->message = $e->getMessage();
		}
		$conn = null;
	}
}

if(isset($_GET['module']) && $_GET['module'] == 'pictures' && isset($_GET['idPicture']) && $_GET['idPicture'] > 0)
{
	$imgIdTemp = (int) $_GET['idPicture'];
	
	$connect = new ConectionDB();
	$connect->setSQL("Select * From pictures where id IN ('{$imgIdTemp}') ");
	$connect->executeSQL();
	if($connect->error == false && $connect->dataCount === 1)
	{
		$tempImg = $connect->data;
		
		$Base64Img = $tempImg->src;
		$Base64Img = @explode('data:image/', $Base64Img);
		$Base64Img = @explode(';base64,',$Base64Img[1]);
		$TypeImg = ($Base64Img[0]);
		$Base64Img = ($Base64Img[1]);
		
		if(!isset($Base64Img[0]) || !isset($Base64Img[1])){
			$path = '_docs/images/sorry-image-not-available.jpg';
			exit('_docs/images/sorry-image-not-available.jpg');
		}
		
	
		if(!isset($data['out_type'])){ $data['out_type'] = $TypeImg; }
		elseif(isset($data['out_type']) && $data['out_type'] !== $TypeImg){ $data['out_type'] = $TypeImg; };
		
		$imageData = base64_decode($Base64Img);
		$source = imagecreatefromstring($imageData);
		
		if($data['out_type'] == 'gif'){
			header("Content-type: image/gif");
			//$source = imagecreatefromgif("data://image/gif;base64,".$Base64Img);
			$source = imagegif($source);
		}
		else if($data['out_type'] == 'png'){
			header("Content-type: image/png");
			$source = imagecreatefrompng("data://image/".$TypeImg.";base64,".$Base64Img);
			
			imageAlphaBlending($source, true);
			imageSaveAlpha($source, true);
			$source = imagepng($source);
		}
		else if($data['out_type'] == 'jpg' || $data['out_type'] == 'jpeg'){
			#$source = imagecreatefromjpeg("data://image/jpeg;base64:".$Base64Img);
			header("Content-type: image/jpeg");
			
			if(isset($data['thumb']) && $data['thumb'] == true){
			$source = imagecreatefromjpeg("data://image/".$TypeImg.";base64,".$Base64Img);
				
				if(isset($data['zoom']) && $data['zoom'] > 0){
					$porcentaje = $data['zoom'];
				}else{
					$porcentaje = 0.5;
				}
				
				$alto = ImageSY($source);
				$ancho = ImageSX($source);
											
				$nuevo_ancho = $ancho * $porcentaje;
				$nuevo_alto = $alto * $porcentaje;
				// Cargar
				$source = imagecreatetruecolor($nuevo_ancho, $nuevo_alto);
				$origen = imagecreatefromjpeg("data://image/".$TypeImg.";base64,".$Base64Img);
				// Cambiar el tamaño
				imagecopyresized($source, $origen, 0, 0, 0, 0, $nuevo_ancho, $nuevo_alto, $ancho, $alto);
			}
			
			$source = imagejpeg($source);
		}
		imagedestroy($source);
	}
   exit();
};
